import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Typography } from '@/constants';

export type SettingsInfoKey = 'privacy' | 'support' | 'legal';

type SettingsInfoContent = {
  title: string;
  body: string;
};

export const getSettingsInfoContent = (key: SettingsInfoKey): SettingsInfoContent => {
  switch (key) {
    case 'privacy':
      return {
        title: 'Confidentialité',
        body: `Vos données sont utilisées pour améliorer votre expérience dans NutriAdapt.\n\nVous pouvez à tout moment demander l’accès, la rectification ou la suppression de vos données depuis votre compte, ou en contactant l’équipe support.`,
      };
    case 'support':
      return {
        title: 'Aide & Support',
        body: `Besoin d’aide ?\n\nConsultez la FAQ (si disponible) et contactez-nous si vous rencontrez un problème avec l’application.`,
      };
    case 'legal':
      return {
        title: 'CGU & Mentions légales',
        body: `En utilisant NutriAdapt, vous acceptez les conditions d’utilisation de l’application.\n\nLes mentions légales et conditions détaillées seront présentées dans cette section.`,
      };
  }
};

export function SettingsInfoModal({
  visible,
  infoKey,
  onClose,
  footer,
}: {
  visible: boolean;
  infoKey: SettingsInfoKey | null;
  onClose: () => void;
  footer?: ReactNode;
}) {
  const content = useMemo(() => {
    if (!infoKey) return null;
    return getSettingsInfoContent(infoKey);
  }, [infoKey]);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCardWrapper} onPress={() => undefined}>
          <Card style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>{content?.title ?? ''}</Text>
              <TouchableOpacity onPress={onClose} hitSlop={12}>
                <Ionicons name="close" size={22} color={Colors.neutral.gray600} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalBody}>{content?.body ?? ''}</Text>

            {footer ?? null}

            <Button title="Fermer" variant="outline" onPress={onClose} />
          </Card>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: `${Colors.neutral.gray900}66`,
  },
  modalCardWrapper: {
    width: '100%',
    maxWidth: 520,
  },
  modalCard: {
    gap: Spacing.lg,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.neutral.gray900,
  },
  modalBody: {
    ...Typography.body2,
    color: Colors.neutral.gray600,
    lineHeight: 20,
  },
});
