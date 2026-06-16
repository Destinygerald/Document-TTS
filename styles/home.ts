export const banner = {
  container:
    "w-[100%] text-center h-[100%] flex flex-col items-center pt-[72px] gap-[16px]",
  badge:
    "px-[32px] py-[6px] mb-[-12px] text-[.6rem] text-primary bg-[rgba(72,71,120,0.38)] rounded-full border-[1px] border-primary relative before:absolute before:content-[''] before:w-[8px] before:h-[8px] before:left-[12px] before:top-[50%] before:translate-y-[-50%] before:bg-primary before:rounded-full",
  head: "text-[clamp(1.48rem,4vw,3.2rem)] [line-height:clamp(2rem,6vw,4rem)] max-w-[65%] max-md:max-w-[82%] text-center font-[600]",
  desc: "w-[58%] text-[.8rem] max-md:w-[80%] max-md:text-[.62rem]",
  how_it_works:
    "flex gap-[60px] max-md:grid max-md:grid-cols-2 max-md:w-[88%] max-md:[&>div:first-child]:col-span-2 max-md:gap-[32px] max-md:justify-items-center",
  how_it_works_card:
    "w-[240px] max-md:w-[180px] h-[72px] rounded-[8px] [&>span:nth-child(2)]:text-[.72rem] bg-secondary text-white flex flex-col items-center justify-center gap-[8px] ",
  input_container:
    "flex flex-col gap-[6px] items-center justify-center relative w-[50%] max-md:w-[80%] h-[168px] bg-foreground mt-[12px] rounded-[16px] border-[2px] border-primary border-dashed overflow-hidden",
  input_text: "text-[.88rem] text-primary",
  input_icon: "text-primary text-[1.48rem]",
  loading_screen:
    "fixed top-0 left-0 w-[100%] h-[100vh] z-[2] bg-[rgba(10,3,17,0.59)] flex flex-col gap-[12px] text-white backdrop-blur-[2px] items-center justify-center",
  loader:
    "w-[36px] h-[36px] relative rounded-full border-t-[2px] border-t-white border-b-[2px] border-b-white bg-transparent animate-spin",
  loading_text: "text-[.82rem] max-w-[80%] text-center font-[500]",
};

export const inputs = {
  file_input_div: "absolute z-[1] w-[100%] h-[100%] top-0 opacity-0",
  file_input: " w-[100%] h-[100%] cursor-pointer",
  file_data:
    "flex flex-col w-[100%] gap-[12px] [&>span:first-child]:text-[.72rem] [&>span:first-child]:font-[600] [&>span:first-child]:capitalize",
  btn_ctn: "flex justify-center gap-[20px]",
  btn: "w-[180px] rounded-[4px] h-[40px] text-[.6rem] bg-primary text-white flex items-center justify-center cursor-pointer",
  cancel_btn: "bg-red-500 ",
};

export const results = {
  container:
    "fixed w-[100%] h-[100vh] top-0 left-0 z-[3] bg-[rgba(10,3,17,0.59)] flex flex-col items-center pt-[40px] backdrop-blur-[4px] gap-[28px]",
  title: "text-[1.2rem] font-[500] max-w-[320px] text-center",
  list: "w-[80%] h-[80vh] overflow-y-auto",
  list_inner: "w-[100%] flex flex-col gap-[12px]",
  list_items:
    "w-[100%] text-left border-[1px] border-primary border-solid rounded-[6px] px-[24px] p-[12px] text-[.72rem] flex items-center justify-between [&>a]:text-[1.2rem] ",
  audio:
    "w-[88%] [&::-webkit-media-controls-enclosure]:bg-[rgba(0,0,0,0)] [&::-webkit-media-controls-timeline]:[filter:hue-rotate(260deg)]",
};
