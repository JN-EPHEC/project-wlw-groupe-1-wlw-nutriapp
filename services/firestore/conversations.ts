import {
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  startAfter,
} from 'firebase/firestore';

import { db } from '../firebase';
import type { ConversationDoc, MessageDoc } from './types';
import { nowTs } from './utils';

export const createConversation = async (
  uid: string,
  input?: { title?: string; context?: ConversationDoc['context'] }
): Promise<{ conversationId: string }> => {
  const ref = collection(db, 'users', uid, 'conversations');
  const now = nowTs();

  const payload: ConversationDoc = {
    schemaVersion: 1,
    kind: 'ai',
    title: input?.title ?? null,
    context: input?.context,
    createdAt: now,
    updatedAt: now,
    lastMessageAt: now,
  };

  const docRef = await addDoc(ref, payload);
  return { conversationId: docRef.id };
};

export const addMessage = async (
  uid: string,
  conversationId: string,
  message: Omit<MessageDoc, 'schemaVersion' | 'createdAt'> & { createdAt?: MessageDoc['createdAt'] },
  options?: { messageId?: string }
): Promise<{ messageId: string }> => {
  const convoRef = doc(db, 'users', uid, 'conversations', conversationId);
  const msgCol = collection(db, 'users', uid, 'conversations', conversationId, 'messages');

  const now = nowTs();
  const createdAt = message.createdAt ?? now;

  const msgDoc: MessageDoc = {
    schemaVersion: 1,
    role: message.role,
    text: message.text,
    createdAt,
    status: message.status,
    clientId: message.clientId,
    model: message.model,
  };

  if (options?.messageId) {
    const msgRef = doc(db, 'users', uid, 'conversations', conversationId, 'messages', options.messageId);
    await runTransaction(db, async (tx) => {
      tx.set(msgRef, msgDoc, { merge: false });
      tx.set(convoRef, { updatedAt: now, lastMessageAt: createdAt }, { merge: true });
    });
    return { messageId: options.messageId };
  }

  const docRef = await addDoc(msgCol, msgDoc);
  await setDoc(convoRef, { updatedAt: now, lastMessageAt: createdAt }, { merge: true });
  return { messageId: docRef.id };
};

export const listMessages = async (
  uid: string,
  conversationId: string,
  options: { limit?: number; cursor?: DocumentSnapshot<MessageDoc> | null } = {}
): Promise<{ items: Array<{ id: string; data: MessageDoc }>; nextCursor: DocumentSnapshot<MessageDoc> | null }> => {
  const ref = collection(db, 'users', uid, 'conversations', conversationId, 'messages');
  const constraints = [orderBy('createdAt', 'desc'), limit(options.limit ?? 50)];
  if (options.cursor) constraints.splice(1, 0, startAfter(options.cursor));

  const q = query(ref, ...constraints);
  const snap = await getDocs(q);
  const docs = snap.docs as Array<DocumentSnapshot<MessageDoc>>;

  const items = docs.map((d) => ({ id: d.id, data: d.data() as MessageDoc }));
  const nextCursor = docs.length > 0 ? docs[docs.length - 1] : null;
  return { items, nextCursor };
};

export const subscribeMessages = (
  uid: string,
  conversationId: string,
  limitCount: number,
  onData: (items: Array<{ id: string; data: MessageDoc }>) => void,
  onError?: (e: Error) => void
) => {
  const ref = collection(db, 'users', uid, 'conversations', conversationId, 'messages');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(limitCount));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, data: d.data() as MessageDoc })));
    },
    (err) => onError?.(err as unknown as Error)
  );
};
