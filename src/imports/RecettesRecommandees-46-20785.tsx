import svgPaths from "./svg-xpa01j6k2y";
import { imgColor } from "./svg-zsm3l";

function SocialNetworkFacebook() {
  return (
    <div className="h-[20.577px] relative shrink-0 w-[20px]" data-name="Social Network/Facebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
        <g id="Social Network/Facebook">
          <path d={svgPaths.p27e31d70} fill="var(--fill-0, #304659)" id="Facebook" />
        </g>
      </svg>
    </div>
  );
}

function SocialNetworkLinkedin() {
  return (
    <div className="h-[20.577px] relative shrink-0 w-[20px]" data-name="Social Network/Linkedin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
        <g id="Social Network/Linkedin">
          <path d={svgPaths.p1e457e00} fill="var(--fill-0, #304659)" id="Linkedin" />
        </g>
      </svg>
    </div>
  );
}

function SocialNetworkTwitter() {
  return (
    <div className="h-[20.577px] relative shrink-0 w-[20px]" data-name="Social Network/Twitter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
        <g id="Social Network/Twitter">
          <path d={svgPaths.p3ee26100} fill="var(--fill-0, #304659)" id="Twitter" />
        </g>
      </svg>
    </div>
  );
}

function SocialNetworkInstagram() {
  return (
    <div className="h-[20.577px] relative shrink-0 w-[20px]" data-name="Social Network/Instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
        <g id="Social Network/Instagram">
          <path clipRule="evenodd" d={svgPaths.p265f7680} fill="var(--fill-0, #304659)" fillRule="evenodd" id="Instagram" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[12px] inset-[40.66%_60.27%_56.41%_8.8%] items-start">
      <SocialNetworkFacebook />
      <SocialNetworkLinkedin />
      <SocialNetworkTwitter />
      <SocialNetworkInstagram />
    </div>
  );
}

function BadgeAppStore45PxBlue() {
  return (
    <div className="h-[40px] relative shrink-0 w-[147px]" data-name="Badge/App Store/45px Blue">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 40">
        <g id="Badge/App Store/45px Blue">
          <rect fill="var(--fill-0, #141416)" height="40" id="Background" rx="5" width="147" />
          <path clipRule="evenodd" d={svgPaths.p2eba6a70} fill="var(--fill-0, #F5F9FC)" fillRule="evenodd" id="App Store" />
        </g>
      </svg>
    </div>
  );
}

function BadgeGooglePlayMarket45PxBlue() {
  return (
    <div className="h-[40px] relative shrink-0 w-[147px]" data-name="Badge/Google Play Market/45px Blue">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 40">
        <g id="Badge/Google Play Market/45px Blue">
          <rect fill="var(--fill-0, #141416)" height="40" id="Background" rx="5" width="147" />
          <path clipRule="evenodd" d={svgPaths.p1de682c0} fill="var(--fill-0, #F5F9FC)" fillRule="evenodd" id="Google Play" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[57.63%_9.6%_28.67%_51.2%] items-start">
      <BadgeAppStore45PxBlue />
      <BadgeGooglePlayMarket45PxBlue />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute bottom-[4.55%] left-0 right-[81.48%] top-[4.55%]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 20">
        <g id="Icon/World">
          <g id="Base"></g>
          <path clipRule="evenodd" d={svgPaths.p1d1b0a00} fill="var(--fill-0, #141416)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute right-[0.09px] size-[20px] top-1/2 translate-y-[-50%]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/Down">
          <g id="Base"></g>
          <path d={svgPaths.p38a22080} fill="var(--fill-0, #95A1BB)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Language() {
  return (
    <div className="h-[22px] overflow-clip relative shrink-0 w-[111.086px]" data-name="Language">
      <Icon />
      <p className="absolute font-['Rubik:Regular',sans-serif] font-normal leading-[22px] left-[27.78%] right-[27.78%] text-[#95a1bb] text-[14px] top-[calc(50%-11px)]">English</p>
      <Icon1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] inset-[85.73%_26.13%_5.14%_8.53%] items-start">
      <Language />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#95a1bb] text-[12px] w-[245px]">Copyright © 2020. All rights reserved.</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute h-[701px] left-[-1px] top-[2667px] w-[375px]" data-name="Footer">
      <div className="absolute bg-[#f4f5f6] inset-0" data-name="Base" />
      <p className="absolute font-['Rubik:Medium',sans-serif] font-medium inset-[7.99%_59.93%_88.02%_8.8%] leading-[28px] text-[#141416] text-[24px]">Sweetdeli</p>
      <Frame6 />
      <p className="absolute font-['Poppins:Medium',sans-serif] inset-[17.26%_68%_79.32%_8.8%] leading-[24px] not-italic text-[#141416] text-[14px]">Contact us</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[22.4%_50.93%_74.75%_8.8%] leading-[20px] not-italic text-[#353945] text-[12px]">sweetdeli@gmail.com</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[27.67%_50.93%_69.47%_8.8%] leading-[20px] not-italic text-[#353945] text-[12px]">+1-2345-6789</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[32.95%_50.93%_64.19%_8.8%] leading-[20px] not-italic text-[#353945] text-[12px]">123 Ave, New York, USA</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[22.4%_6.93%_74.75%_54.67%] leading-[20px] not-italic text-[#363940] text-[12px]">Auctor volutpat.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[27.25%_6.93%_69.9%_54.67%] leading-[20px] not-italic text-[#363940] text-[12px]">Fermentum turpis.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[32.1%_6.93%_65.05%_54.67%] leading-[20px] not-italic text-[#363940] text-[12px]">Mi consequat.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[36.95%_6.93%_60.2%_54.67%] leading-[20px] not-italic text-[#363940] text-[12px]">Amet venenatis.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[41.8%_6.93%_55.35%_54.67%] leading-[20px] not-italic text-[#363940] text-[12px]">Convallis porttitor.</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] inset-[17.26%_25.58%_79.32%_54.67%] leading-[24px] not-italic text-[#141416] text-[14px]">Products</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[57.59%_53.07%_39.55%_8.53%] leading-[20px] not-italic text-[#363940] text-[12px]">Egestas vitae.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[62.44%_53.07%_34.7%_8.53%] leading-[20px] not-italic text-[#363940] text-[12px]">Viverra lorem ac.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[67.29%_53.07%_29.85%_8.53%] leading-[20px] not-italic text-[#363940] text-[12px]">Eget ac tellus.</p>
      <p className="absolute bottom-1/4 font-['Poppins:Regular',sans-serif] leading-[20px] left-[8.53%] not-italic right-[53.07%] text-[#363940] text-[12px] top-[72.14%]">Erat nulla.</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] inset-[76.99%_53.07%_20.15%_8.53%] leading-[20px] not-italic text-[#363940] text-[12px]">Vulputate proin.</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] inset-[51.21%_78.03%_45.36%_8.53%] leading-[24px] not-italic text-[#141416] text-[14px]">About</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] inset-[51.21%_3.73%_45.36%_52%] leading-[24px] not-italic text-[#141416] text-[14px]">Get the app</p>
      <Frame3 />
      <Frame7 />
    </div>
  );
}

function Information() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[11px] top-[130.76px] w-[219px]">{`Grilled Salmon & Quinoa`}</p>
    </div>
  );
}

function Icons16PxStar() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar key={i} />
      ))}
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame8 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle() {
  return (
    <div className="absolute left-[117px] size-[25px] top-[197px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[229px] left-[28px] top-[272px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[5px] not-italic text-[#777e90] text-[11px] top-[150.76px] w-[219px]">380 kcal · 15g protein</p>
      <Frame10 />
      <AntDesignPictureFilled />
      <ArrowDownCircle />
    </div>
  );
}

function Information1() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Vegetarian Lentil Bowl</p>
    </div>
  );
}

function Icons16PxStar1() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar1 key={i} />
      ))}
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame15 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (98)`}</p>
    </div>
  );
}

function AntDesignPictureFilled1() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle1() {
  return (
    <div className="absolute left-[117px] size-[25px] top-[197px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+8.5px)] top-[272px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information1 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[5px] not-italic text-[#777e90] text-[11px] top-[150.76px] w-[219px]">410 kcal · 18g protein</p>
      <Frame16 />
      <AntDesignPictureFilled1 />
      <ArrowDownCircle1 />
    </div>
  );
}

function Information2() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">{`Chicken & Veggie Wrap`}</p>
    </div>
  );
}

function Icons16PxStar2() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar2 key={i} />
      ))}
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame24 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled2() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle2() {
  return (
    <div className="absolute left-[117px] size-[25px] top-[197px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute h-[229px] left-[28px] top-[528px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information2 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[5px] not-italic text-[#777e90] text-[11px] top-[150.76px] w-[219px]">350 kcal · 22g protein</p>
      <Frame25 />
      <AntDesignPictureFilled2 />
      <ArrowDownCircle2 />
    </div>
  );
}

function Information3() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Oatmeal with Berries</p>
    </div>
  );
}

function Icons16PxStar3() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar3 key={i} />
      ))}
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame26 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled3() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle3() {
  return (
    <div className="absolute left-[117px] size-[25px] top-[197px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+8.5px)] top-[528px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information3 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[5px] not-italic text-[#777e90] text-[11px] top-[150.76px] w-[219px]">280 kcal · 9g protein</p>
      <Frame27 />
      <AntDesignPictureFilled3 />
      <ArrowDownCircle3 />
    </div>
  );
}

function Frame22() {
  return <div className="absolute h-[229px] left-[36px] top-[795px] w-[152px]" />;
}

function Information4() {
  return (
    <div className="absolute contents left-[34px] top-[925.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[34px] not-italic text-[#182135] text-[12px] top-[925.76px] w-[219px]">Chickpea Curry</p>
    </div>
  );
}

function Icons16PxStar4() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar4 key={i} />
      ))}
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[34px] top-[977.76px]">
      <Frame28 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled4() {
  return (
    <div className="absolute inset-[74.2%_64.55%_20.46%_19.6%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle4() {
  return (
    <div className="absolute left-[calc(25%+52.25px)] size-[25px] top-[992px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return <div className="absolute h-[229px] left-[calc(50%+16.5px)] top-[795px] w-[152px]" />;
}

function Information5() {
  return (
    <div className="absolute contents left-[calc(50%+14.5px)] top-[925.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[calc(50%+14.5px)] not-italic text-[#182135] text-[11px] top-[925.76px] w-[219px]">Zucchini Pasta with Pesto</p>
    </div>
  );
}

function Icons16PxStar5() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar5 key={i} />
      ))}
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[calc(50%+14.5px)] top-[977.76px]">
      <Frame30 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled5() {
  return (
    <div className="absolute inset-[74.2%_19.75%_20.46%_64.4%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDownCircle5() {
  return (
    <div className="absolute left-[calc(75%+32.75px)] size-[25px] top-[992px]" data-name="Arrow down-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Arrow down-circle">
          <path d={svgPaths.p11e4a080} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function IconsArrowLeft2Line() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/Arrow Left 2/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/Arrow Left 2/Line">
          <path clipRule="evenodd" d={svgPaths.p2e497f80} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LeftArrow() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Left arrow">
      <IconsArrowLeft2Line />
    </div>
  );
}

function IconsArrowRight2Line() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/Arrow Right 2/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/Arrow Right 2/Line">
          <path clipRule="evenodd" d={svgPaths.p258b4600} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function RightArrow() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Right arrow">
      <div aria-hidden="true" className="absolute border-2 border-[#e6e8ec] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <IconsArrowRight2Line />
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[calc(50%+64.5px)] top-[215px]" data-name="Arrow">
      <LeftArrow />
      <RightArrow />
    </div>
  );
}

function ShoppingCart() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart />
    </div>
  );
}

function Information6() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar6() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar6 key={i} />
      ))}
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame32 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled6() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute h-[229px] left-[32px] top-[1152px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group />
      <Information6 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame33 />
      <AntDesignPictureFilled6 />
    </div>
  );
}

function ShoppingCart1() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart1 />
    </div>
  );
}

function Information7() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar7() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar7 key={i} />
      ))}
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame34 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled7() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+16.5px)] top-[1152px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group1 />
      <Information7 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame35 />
      <AntDesignPictureFilled7 />
    </div>
  );
}

function ShoppingCart2() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart2 />
    </div>
  );
}

function Information8() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar8() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar8 key={i} />
      ))}
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame36 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled8() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute h-[229px] left-[26px] top-[1507px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group2 />
      <Information8 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame37 />
      <AntDesignPictureFilled8 />
    </div>
  );
}

function ShoppingCart3() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart3 />
    </div>
  );
}

function Information9() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar9() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar9 key={i} />
      ))}
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame38 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled9() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+10.5px)] top-[1507px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group3 />
      <Information9 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame39 />
      <AntDesignPictureFilled9 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[26px] top-[1507px]">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function ShoppingCart4() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart4 />
    </div>
  );
}

function Information10() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar10() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar10 key={i} />
      ))}
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame40 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled10() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute h-[229px] left-[26px] top-[1764px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group4 />
      <Information10 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame41 />
      <AntDesignPictureFilled10 />
    </div>
  );
}

function ShoppingCart5() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart5 />
    </div>
  );
}

function Information11() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar11() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar11 key={i} />
      ))}
    </div>
  );
}

function Frame44() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame43 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled11() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+10.5px)] top-[1764px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group5 />
      <Information11 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame44 />
      <AntDesignPictureFilled11 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[26px] top-[1764px]">
      <Frame42 />
      <Frame45 />
    </div>
  );
}

function ShoppingCart6() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart6 />
    </div>
  );
}

function Information12() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar12() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar12 key={i} />
      ))}
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame46 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled12() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute h-[229px] left-[26px] top-[2021px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group6 />
      <Information12 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame47 />
      <AntDesignPictureFilled12 />
    </div>
  );
}

function ShoppingCart7() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart7 />
    </div>
  );
}

function Information13() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar13() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar13 key={i} />
      ))}
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame49 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled13() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+10.5px)] top-[2021px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group7 />
      <Information13 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame50 />
      <AntDesignPictureFilled13 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[26px] top-[2021px]">
      <Frame48 />
      <Frame51 />
    </div>
  );
}

function ShoppingCart8() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart8 />
    </div>
  );
}

function Information14() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar14() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar14 key={i} />
      ))}
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame52 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled14() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute h-[229px] left-[26px] top-[2278px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group12 />
      <Information14 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame53 />
      <AntDesignPictureFilled14 />
    </div>
  );
}

function ShoppingCart9() {
  return (
    <div className="absolute inset-[80.9%_8.94%_12.04%_80.44%] overflow-clip" data-name="shopping-cart">
      <div className="absolute bg-[#fcfcfd] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[16.14px_15.483px]" data-name="Color" style={{ maskImage: `url('${imgColor}')` }} />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[77.73%_4.17%_8.87%_75.66%]">
      <div className="absolute inset-[77.73%_4.17%_8.87%_75.66%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
          <ellipse cx="15.3334" cy="15.3486" fill="var(--fill-0, #353945)" id="Ellipse 13" rx="15.3334" ry="15.3486" />
        </svg>
      </div>
      <ShoppingCart9 />
    </div>
  );
}

function Information15() {
  return (
    <div className="absolute contents left-[5px] top-[130.76px]" data-name="Information">
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[12px] left-[5px] not-italic text-[#182135] text-[12px] top-[130.76px] w-[219px]">Chocolate Cheesecake</p>
    </div>
  );
}

function Icons16PxStar15() {
  return (
    <div className="h-[11px] relative shrink-0 w-[12px]" data-name="Icons/16px/Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        <g id="Icons/16px/Star">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p3a402900} fill="var(--fill-0, #141416)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      {[...Array(5).keys()].map((_, i) => (
        <Icons16PxStar15 key={i} />
      ))}
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center justify-center left-[5px] top-[182.76px]">
      <Frame55 />
      <p className="font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#626264] text-[10px] text-nowrap whitespace-pre">{` (120)`}</p>
    </div>
  );
}

function AntDesignPictureFilled15() {
  return (
    <div className="absolute inset-[13.13%_31.63%_60.9%_29.28%]" data-name="ant-design:picture-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="ant-design:picture-filled">
          <path d={svgPaths.p28e444f0} fill="var(--fill-0, #FCFCFD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute h-[229px] left-[calc(50%+10.5px)] top-[2278px] w-[152px]">
      <div className="absolute bg-white inset-0 rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute bottom-[50.92%] left-0 right-0 top-0" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Group13 />
      <Information15 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[5px] not-italic text-[#182135] text-[16px] top-[150.76px] w-[219px]">$20.99</p>
      <Frame56 />
      <AntDesignPictureFilled15 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[26px] top-[2278px]">
      <Frame54 />
      <Frame57 />
    </div>
  );
}

function IconsArrowLeft2Line1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/Arrow Left 2/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/Arrow Left 2/Line">
          <path clipRule="evenodd" d={svgPaths.p2e497f80} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LeftArrow1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Left arrow">
      <IconsArrowLeft2Line1 />
    </div>
  );
}

function IconsArrowRight2Line1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/Arrow Right 2/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/Arrow Right 2/Line">
          <path clipRule="evenodd" d={svgPaths.p258b4600} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function RightArrow1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Right arrow">
      <div aria-hidden="true" className="absolute border-2 border-[#e6e8ec] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <IconsArrowRight2Line1 />
    </div>
  );
}

function Arrow1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[calc(50%+68.5px)] top-[1095px]" data-name="Arrow">
      <LeftArrow1 />
      <RightArrow1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] items-center justify-center left-[33px] px-[16px] py-[12px] rounded-[90px] top-[2547px] w-[310px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#777e90] border-solid inset-0 pointer-events-none rounded-[90px]" />
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#777e90] text-[14px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Load more 100+
      </p>
    </div>
  );
}

function Icons20PxSearch() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[12px]" data-name="Icons/20px/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icons/20px/Search">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p1989df00} fill="var(--fill-0, black)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icons20PxFilter() {
  return (
    <div className="absolute left-1/2 size-[20px] top-[calc(50%-0.09px)] translate-x-[-50%] translate-y-[-50%]" data-name="Icons/20px/Filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icons/20px/Filter">
          <g id="Bounding Box"></g>
          <path d={svgPaths.p1e2e51f0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconsIconFill48Px() {
  return (
    <div className="absolute bottom-[2.01%] left-[85.85%] right-0 top-0" data-name="Icons/Icon-fill/48px">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 41">
        <path d={svgPaths.p38a118f0} fill="var(--fill-0, black)" id="Background" />
      </svg>
      <Icons20PxFilter />
    </div>
  );
}

function Buttons() {
  return (
    <div className="absolute bottom-[2.01%] contents left-[85.85%] right-0 top-0" data-name="Buttons">
      <IconsIconFill48Px />
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-[41px] relative shrink-0 w-[311px]">
      <div className="absolute bg-[#f7f7f7] bottom-0 left-0 right-[21.22%] rounded-[10px] top-0" data-name="Background" />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[20px] left-[48px] not-italic text-[#626264] text-[12px] top-[12px] w-[152px]">Salads</p>
      <Icons20PxSearch />
      <Buttons />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[28px] items-start left-[33px] top-[122px]">
      <Frame17 />
    </div>
  );
}

function IconsUserLine() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icons/User/Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icons/User/Line">
          <path clipRule="evenodd" d={svgPaths.p230f0080} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="Shape" />
          <path clipRule="evenodd" d={svgPaths.p2ac7280} fill="var(--fill-0, #777E91)" fillRule="evenodd" id="Shape_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[22px] items-center justify-center relative shrink-0">
      <IconsUserLine />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] items-start left-0 p-[10px] top-0">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[44px]">
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[20px] items-end relative shrink-0">
      <Frame2 />
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

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] inset-[3.42%_12.8%_92.63%_64.8%] items-center justify-center">
      <Frame4 />
      <IconsBurgerLine />
    </div>
  );
}

function IconsStarFilled() {
  return (
    <div className="absolute left-[45px] size-[16px] top-[51.5px]" data-name="icons/Star/Filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icons/Star/Filled">
          <path d={svgPaths.p2a6f2980} fill="var(--fill-0, #23262F)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

export default function RecettesRecommandees() {
  return (
    <div className="bg-white relative size-full" data-name="Recettes recommandées">
      <Footer />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[32px] left-[28px] not-italic text-[24px] text-black text-nowrap top-[219px] whitespace-pre">Recommended</p>
      <Frame9 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <div className="absolute bg-white inset-[71.49%_51.73%_7.91%_7.73%] rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute inset-[71.49%_51.73%_18.4%_7.73%]" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information4 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[34px] not-italic text-[#777e90] text-[11px] top-[945.76px] w-[219px]">420 kcal · 14g protein</p>
      <Frame29 />
      <AntDesignPictureFilled4 />
      <ArrowDownCircle4 />
      <Frame23 />
      <div className="absolute bg-white inset-[71.49%_6.93%_7.91%_52.53%] rounded-[10px]">
        <div aria-hidden="true" className="absolute border-[#b1b5c3] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="absolute inset-[71.49%_6.93%_18.4%_52.53%]" data-name="Image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 152 113">
          <path clipRule="evenodd" d={svgPaths.pab10100} fill="var(--fill-0, #B1B5C4)" fillRule="evenodd" id="Image" />
        </svg>
      </div>
      <Information5 />
      <p className="absolute font-['Poppins:Medium',sans-serif] leading-[24px] left-[calc(50%+14.5px)] not-italic text-[#777e90] text-[11px] top-[945.76px] w-[219px]">
        330 kcal · 11g protein
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <Frame31 />
      <AntDesignPictureFilled5 />
      <ArrowDownCircle5 />
      <Arrow />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[32px] left-[32px] not-italic text-[24px] text-black text-nowrap top-[1099px] whitespace-pre">Best Seller</p>
      <Frame11 />
      <Frame12 />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[32px] left-[32px] not-italic text-[24px] text-black text-nowrap top-[1454px] whitespace-pre">All Product</p>
      <Group8 />
      <Group9 />
      <Group10 />
      <Group11 />
      <Arrow1 />
      <Button />
      <Frame18 />
      <Frame5 />
      <IconsStarFilled />
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[16px] left-[73px] text-[#23262f] text-[16px] text-nowrap top-[51.5px] whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        LOGO
      </p>
    </div>
  );
}