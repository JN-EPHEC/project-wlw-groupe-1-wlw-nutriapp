import svgPaths from "./svg-zl1gfn6e9x";
import imgImage2 from "figma:asset/0da11e1712b0c18beb8f15818d9ed4d215ca9118.png";
import { imgRectangleCopy25, imgImage1 } from "./svg-mahup";

function Component3ElementsNavigationMessageOff({ className }: { className?: string }) {
  return (
    <div className={className} data-name="3_Elements_navigation\Message\Off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <path clipRule="evenodd" d={svgPaths.p2e1a3000} fill="var(--fill-0, #96A7AF)" fillRule="evenodd" id="Shape" />
      </svg>
    </div>
  );
}

function Button({ className }: { className?: string }) {
  return (
    <div className={className} data-name="button">
      <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[16px] py-[12px] relative rounded-[90px] shrink-0" data-name="button">
        <div aria-hidden="true" className="absolute border-2 border-[#e6e8ec] border-solid inset-0 pointer-events-none rounded-[90px]" />
        <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#23262f] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
          Mettre à jour mes informations
        </p>
      </div>
    </div>
  );
}

function IconsUserLine() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/User/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/User/Line">
          <path clipRule="evenodd" d={svgPaths.p230f0080} fill="var(--fill-0, black)" fillRule="evenodd" id="Shape" />
          <path clipRule="evenodd" d={svgPaths.p2ac7280} fill="var(--fill-0, black)" fillRule="evenodd" id="Shape_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[22px] items-center justify-center relative shrink-0">
      <IconsUserLine />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] items-start left-0 p-[10px] top-0">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[44px]">
      <Frame2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[20px] items-end relative shrink-0">
      <Frame3 />
    </div>
  );
}

function IconsBurgerLine() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="icons/Burger/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="icons/Burger/Line">
          <g id="burger icon">
            <path d={svgPaths.p18394000} fill="var(--fill-0, #777E91)" />
            <path d={svgPaths.p31092900} fill="var(--fill-0, #777E91)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] inset-[19.86%_11.47%_19.86%_66.13%] items-center justify-center">
      <Frame5 />
      <IconsBurgerLine />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#fcfcfd] inset-[33.04%_63.47%_33.93%_9.87%] rounded-[90px]" data-name="button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#23262f] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
            Mon Profil
          </p>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="h-[73px] relative shrink-0 w-[375px]" data-name="Nav">
      <div className="absolute bg-[#fcfcfd] inset-0" />
      <Frame6 />
      <Button1 />
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center justify-center opacity-0 px-[16px] py-[12px] relative rounded-[90px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#e6e8ec] border-solid inset-0 pointer-events-none rounded-[90px]" />
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#23262f] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        View profile
      </p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="title">
      <div className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[40px] relative shrink-0 text-[#23262f] text-[32px] text-nowrap tracking-[-0.32px] whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Suivi de mes données `}</p>
        <p>de santé</p>
      </div>
      <Button2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Poppins:Light',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#23262f] text-[13px] w-full">Consultez l’évolution de vos indicateurs hebdomadaires et suivez vos progrès</p>
    </div>
  );
}

function ProfileSetting() {
  return (
    <div className="bg-[#fcfcfd] box-border content-stretch flex flex-col gap-[32px] items-center justify-center pb-[64px] pt-[32px] px-[32px] relative shrink-0 w-[374px]" data-name="profile setting">
      <Title />
      <Frame4 />
    </div>
  );
}

function AccountSetting() {
  return (
    <div className="absolute content-stretch flex flex-col h-[292px] items-start left-0 top-0" data-name="account setting">
      <Nav />
      <ProfileSetting />
    </div>
  );
}

function Badge() {
  return <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0" data-name="Badge" />;
}

function Value() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Value">
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[0px] text-nowrap tracking-[0.5px] whitespace-pre">
        <span className="text-[22px]">{`1,05 `}</span>
        <span className="text-[#07a22e] text-[12px]">g/L</span>
      </p>
      <Badge />
    </div>
  );
}

function MetaValueContainer() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="meta/value Container">
      <p className="font-['Lato:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[14px] tracking-[0.5px] w-full">Taux de glycémie</p>
      <Value />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_16006)" id="Icon">
          <path d={svgPaths.p4af10c0} id="Vector" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M11.3333 4H15.3333V8" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_46_16006">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconR() {
  return (
    <div className="bg-[#f7f8f9] box-border content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Icon R">
      <Icon />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <MetaValueContainer />
      <IconR />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Header />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Container />
    </div>
  );
}

function Cards() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] items-start left-[25px] p-[12px] rounded-[8px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] top-[631px] w-[172px]" data-name="Cards">
      <Content />
    </div>
  );
}

function Badge1() {
  return <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0" data-name="Badge" />;
}

function Value1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Value">
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[0px] text-nowrap tracking-[0.5px] whitespace-pre">
        <span className="text-[22px]">{`2.800 `}</span>
        <span className="text-[#ed8f2a] text-[12px]">kcal/h</span>
      </p>
      <Badge1 />
    </div>
  );
}

function MetaValueContainer1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="meta/value Container">
      <p className="font-['Lato:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[14px] tracking-[0.5px] w-full">Apport calorique</p>
      <Value1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_16006)" id="Icon">
          <path d={svgPaths.p4af10c0} id="Vector" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M11.3333 4H15.3333V8" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_46_16006">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconR1() {
  return (
    <div className="bg-[#f7f8f9] box-border content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Icon R">
      <Icon1 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <MetaValueContainer1 />
      <IconR1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Header1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Container1 />
    </div>
  );
}

function Cards1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] items-start left-[222px] p-[12px] rounded-[8px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] top-[631px] w-[137px]" data-name="Cards">
      <Content1 />
    </div>
  );
}

function Badge2() {
  return <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0" data-name="Badge" />;
}

function Value2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Value">
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[0px] text-nowrap tracking-[0.5px] whitespace-pre">
        <span className="text-[22px]">{`128/84 `}</span>
        <span className="text-[#848484] text-[12px]">mmHg</span>
      </p>
      <Badge2 />
    </div>
  );
}

function MetaValueContainer2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="meta/value Container">
      <p className="font-['Lato:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[14px] tracking-[0.5px] w-full whitespace-pre-wrap">{`Tension  artérielle`}</p>
      <Value2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_16006)" id="Icon">
          <path d={svgPaths.p4af10c0} id="Vector" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M11.3333 4H15.3333V8" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_46_16006">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconR2() {
  return (
    <div className="bg-[#f7f8f9] box-border content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Icon R">
      <Icon2 />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <MetaValueContainer2 />
      <IconR2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Header2 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Container2 />
    </div>
  );
}

function Cards2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] items-start left-[25px] p-[12px] rounded-[8px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] top-[735px] w-[136px]" data-name="Cards">
      <Content2 />
    </div>
  );
}

function Badge3() {
  return <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[4px] py-[2px] rounded-[4px] shrink-0" data-name="Badge" />;
}

function Value3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Value">
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[0px] text-nowrap tracking-[0.5px] whitespace-pre">
        <span className="text-[22px]">{`68 `}</span>
        <span className="text-[#15b24a] text-[12px]">kg</span>
      </p>
      <Badge3 />
    </div>
  );
}

function MetaValueContainer3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="meta/value Container">
      <p className="font-['Lato:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[14px] tracking-[0.5px] w-full">Poids</p>
      <Value3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_16006)" id="Icon">
          <path d={svgPaths.p4af10c0} id="Vector" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M11.3333 4H15.3333V8" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_46_16006">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconR3() {
  return (
    <div className="bg-[#f7f8f9] box-border content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Icon R">
      <Icon3 />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <MetaValueContainer3 />
      <IconR3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Header3 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Container3 />
    </div>
  );
}

function Cards3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[12px] items-start left-[185px] p-[12px] rounded-[8px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] top-[735px] w-[174px]" data-name="Cards">
      <Content3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_46_16047)" id="Icon">
          <path d={svgPaths.p213d6eb4} id="Vector" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p20903fc0} id="Vector_2" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1d671e00} id="Vector_3" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1535a200} id="Vector_4" stroke="var(--stroke-0, #2D2D2D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_46_16047">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#f7f8f9] box-border content-stretch flex gap-[8px] items-start p-[8px] right-0 rounded-[8px] top-0">
      <Icon4 />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Text">
      <p className="font-['Lato:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[14px] tracking-[0.5px] w-[273px]">Évolution de vos données</p>
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#2d2d2d] text-[22px] tracking-[0.5px] w-[min-content]">Glycémie | Poids | Tension</p>
      <Frame />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Text />
    </div>
  );
}

function Tab() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[#e7eaee] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[10px] py-[6px] relative w-full">
          <p className="[white-space-collapse:collapse] font-['Lato:Medium',sans-serif] h-[16px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] w-full">30M</p>
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[#e7eaee] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[10px] py-[6px] relative w-full">
          <p className="[white-space-collapse:collapse] font-['Lato:Medium',sans-serif] h-[16px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] w-full">4H</p>
        </div>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="basis-0 bg-[#e7eaee] grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Tab">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[10px] py-[6px] relative w-full">
          <p className="[white-space-collapse:collapse] font-['Lato:Medium',sans-serif] h-[16px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] w-full">1D</p>
        </div>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Tab">
      <div aria-hidden="true" className="absolute border border-[#e7eaee] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[10px] py-[6px] relative w-full">
          <p className="[white-space-collapse:collapse] font-['Lato:Medium',sans-serif] h-[16px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] w-full">1W</p>
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Tabs">
      <Tab />
      <Tab1 />
      <Tab2 />
      <Tab3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full" data-name="Header">
      <Container4 />
      <Tabs />
    </div>
  );
}

function GraphContainer() {
  return <div className="bg-white box-border content-stretch flex flex-col gap-[16px] items-start pb-[32px] pt-[16px] px-0 shrink-0 w-full" data-name="Graph container" />;
}

function LineGraph() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[17px] top-[870px] w-[342px]" data-name="Line Graph">
      <Header4 />
      <GraphContainer />
    </div>
  );
}

function KeyItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #00C7F2)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">Glycémie</p>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Item">
      <KeyItem />
    </div>
  );
}

function KeyItem1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #0FCA7A)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">Poids</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Item">
      <KeyItem1 />
    </div>
  );
}

function KeyItem2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Key Item">
      <div className="relative shrink-0 size-[10px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #F7A23B)" id="Ellipse 13" r="5" />
        </svg>
      </div>
      <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2d2d2d] text-[12px] text-nowrap tracking-[0.5px] whitespace-pre">Tension</p>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Item">
      <KeyItem2 />
    </div>
  );
}

function Key() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[53px] top-[1246px] w-[241px]" data-name="Key">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function Row() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">1000</p>
    </div>
  );
}

function Row1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">750</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265 1">
            <path d="M0 0.5H265" id="Vector" stroke="var(--stroke-0, #E6E6E6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">500</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265 1">
            <path d="M0 0.5H265" id="Vector" stroke="var(--stroke-0, #E6E6E6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">250</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0" data-name="Vector">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265 1">
            <path d="M0 0.5H265" id="Vector" stroke="var(--stroke-0, #E6E6E6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex h-[35.4px] items-center relative shrink-0 w-full" data-name="Row">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#72777b] text-[12px] text-right w-[39px]">0</p>
    </div>
  );
}

function YAxis() {
  return (
    <div className="content-stretch flex flex-col h-[227px] items-start relative shrink-0 w-full" data-name="y-axis">
      <Row />
      <Row1 />
      {[...Array(3).keys()].map((_, i) => (
        <Row2 key={i} />
      ))}
      <Row3 />
      <Row4 />
    </div>
  );
}

function Column() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "199", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[199px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <line id="Line 1" opacity="0" stroke="var(--stroke-0, #E6E6E6)" x2="199" y1="-0.5" y2="-0.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">0</p>
    </div>
  );
}

function Column1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "196", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[white-space-collapse:collapse] font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#72777b] text-[12px] text-nowrap w-full">100</p>
    </div>
  );
}

function Column2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "196", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">600</p>
    </div>
  );
}

function Column3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "196", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">700</p>
    </div>
  );
}

function Column4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "196", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">800</p>
    </div>
  );
}

function Column5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow h-full items-start min-h-px min-w-px relative shrink-0" data-name="column\'">
      <div className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "196", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[196px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 196 1">
                <line id="Line 1" stroke="var(--stroke-0, #E6E6E6)" x2="196" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#72777b] text-[12px] w-[min-content]">900</p>
    </div>
  );
}

function XAxis() {
  return (
    <div className="absolute content-stretch flex inset-0 items-end" data-name="x-axis">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
    </div>
  );
}

function DataLines() {
  return (
    <div className="absolute bottom-[12.32%] contents left-0 right-0 top-[12.32%]" data-name="Data Lines">
      <div className="absolute bottom-[12.32%] flex items-center justify-center left-0 right-0 top-[15.64%]">
        <div className="flex-none h-[152px] scale-y-[-100%] w-[265px]">
          <div className="relative size-full" data-name="🔵 Blue">
            <div className="absolute inset-[-0.21%_-0.26%_-1.78%_-0.23%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267 156">
                <path d={svgPaths.p9bcabc0} id="ðµ Blue" stroke="var(--stroke-0, #00C7F2)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[19.43%] flex items-center justify-center left-0 right-0 top-[12.8%]">
        <div className="flex-none h-[143px] scale-y-[-100%] w-[265px]">
          <div className="relative size-full" data-name="🟢 Green">
            <div className="absolute inset-[-1.13%_-0.15%_-0.74%_-0.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266 146">
                <path d={svgPaths.p1903e1e0} id="ð¢ Green" stroke="var(--stroke-0, #0FCA7A)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[12.8%] flex items-center justify-center left-0 right-0 top-[12.32%]">
        <div className="flex-none h-[158px] scale-y-[-100%] w-[265px]">
          <div className="relative size-full" data-name="🟡 Yellow">
            <div className="absolute inset-[-0.49%_-0.17%_-0.68%_-0.09%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266 160">
                <path d={svgPaths.p2989b800} id="ð¡ Yellow" stroke="var(--stroke-0, #FBC62F)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XAxisContainer() {
  return (
    <div className="absolute h-[211px] left-[47px] right-0 top-[15px]" data-name="X-axis Container">
      <div className="absolute h-[196px] left-0 right-0 top-0" data-name="Outline">
        <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-0 pointer-events-none" />
      </div>
      <XAxis />
      <DataLines />
    </div>
  );
}

function Graph() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[31px] top-[1001px] w-[312px]" data-name="Graph">
      <YAxis />
      <XAxisContainer />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[-4px] top-[97px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "31.859375", "--transform-inner-height": "14" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <p className="font-['Lato:Regular',sans-serif] leading-[normal] not-italic relative text-[#2d2d2d] text-[12px] text-center text-nowrap tracking-[0.5px] whitespace-pre">Label</p>
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[48px] mix-blend-overlay top-[422px]" data-name="Mask Group">
      <div className="absolute bg-[#6cadff] inset-[34.66%_62.75%_57.36%_-19.73%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[122px_-56px] mask-size-[290px_152px] mix-blend-overlay opacity-20 rounded-[20px]" data-name="Rectangle Copy 25" style={{ maskImage: `url('${imgRectangleCopy25}')` }} />
      <div className="absolute bg-[#6cadff] inset-[29.44%_-1.33%_64.97%_61.64%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-183.158px_16px] mask-size-[290px_152px] mix-blend-overlay opacity-20 rounded-[20px]" data-name="Rectangle Copy 26" style={{ maskImage: `url('${imgRectangleCopy25}')` }} />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[32.34%_15.2%_67.44%_81.2%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 3">
        <g id="Group 19">
          <circle cx="1.5" cy="1.5" fill="var(--fill-0, white)" id="Ellipse 16" r="1.5" />
          <circle cx="6.75" cy="1.5" fill="var(--fill-0, white)" id="Ellipse 17" r="1.5" />
          <circle cx="12" cy="1.5" fill="var(--fill-0, white)" id="Ellipse 18" r="1.5" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Mask Group">
      <div className="absolute bottom-[-33.33%] left-[-38.6%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[13.509px_0px] mask-size-[35px_35px] right-[-61.4%] top-0" data-name="image 1" style={{ maskImage: `url('${imgImage1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
    </div>
  );
}

function Contacts1LinePicture() {
  return (
    <div className="absolute inset-[31.76%_73.6%_65.7%_17.07%]" data-name="Contacts\1Line\Picture">
      <div className="absolute bg-[#ffc542] inset-0 rounded-[32.5px]" data-name="Rectangle Copy 25" />
      <MaskGroup1 />
    </div>
  );
}

function Contacts1LinePicture1() {
  return (
    <div className="absolute inset-[36.98%_14.13%_59.54%_73.07%]" data-name="Contacts\1Line\Picture">
      <div className="absolute bg-white inset-0 rounded-[32.5px]" data-name="Rectangle Copy 25">
        <div aria-hidden="true" className="absolute border-2 border-[rgba(0,98,255,0.3)] border-solid inset-[-2px] pointer-events-none rounded-[34.5px]" />
      </div>
      <Component3ElementsNavigationMessageOff className="absolute inset-[31.25%_31.25%_29.17%_29.17%]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[48px] top-[422px]">
      <div className="absolute h-[152px] left-[48px] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(150,167,175,0.4),0px_7px_10px_0px_rgba(197,208,214,0.25),0px_1px_20px_0px_rgba(197,208,214,0.4)] top-[422px] w-[290px]" style={{ backgroundImage: "linear-gradient(163.274deg, rgba(1, 57, 254, 0.4) 18.22%, rgba(16, 241, 255, 0.4) 102.67%), linear-gradient(90deg, rgb(0, 98, 255) 0%, rgb(0, 98, 255) 100%)" }} />
      <MaskGroup />
      <Group />
      <Contacts1LinePicture />
      <Contacts1LinePicture1 />
      <p className="absolute font-['Assistant:Bold',sans-serif] font-bold leading-[normal] left-[111px] text-[18px] text-nowrap text-white top-[436px] whitespace-pre">Dr. Pat Gulipat</p>
      <p className="absolute font-['Assistant:SemiBold',sans-serif] font-semibold leading-[normal] left-[68px] text-[14px] text-nowrap text-white top-[517px] whitespace-pre">Sunday, 27 June 2021</p>
      <p className="absolute font-['Assistant:Regular',sans-serif] font-normal leading-[normal] left-[68px] opacity-75 text-[12px] text-nowrap text-white top-[538px] whitespace-pre">08:00am - 10:00am</p>
      <p className="absolute font-['Assistant:Regular',sans-serif] font-normal leading-[normal] left-[111px] opacity-75 text-[12px] text-nowrap text-white top-[460px] whitespace-pre">Mon médecin</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white h-[1379px] left-0 top-0 w-[375px]">
      <AccountSetting />
      <Cards />
      <Cards1 />
      <Cards2 />
      <Cards3 />
      <LineGraph />
      <p className="absolute font-['Lato:Medium',sans-serif] leading-[normal] left-[17px] not-italic text-[#72777b] text-[14px] top-[1285px] tracking-[0.5px] w-[273px]">Dernière mise à jour : 02 novembre 2025</p>
      <Key />
      <Graph />
      <Button className="absolute content-stretch flex items-start left-[72px] top-[324px]" />
      <Group1 />
      <div className="absolute flex h-0 items-center justify-center left-[-158px] top-[604px] w-[158px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[158px]">
            <div className="absolute bottom-[-7.36px] left-0 right-[-0.63%] top-[-7.36px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159 15">
                <path d={svgPaths.p30418300} fill="var(--stroke-0, black)" id="Arrow 16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[1379px] left-0 top-0 w-[375px]">
      <Group2 />
    </div>
  );
}

export default function Frame8() {
  return (
    <div className="relative size-full">
      <Frame9 />
    </div>
  );
}