import { banner } from "@/styles";
import { FileInput } from "../ui";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoEarOutline } from "react-icons/io5";
import { Card } from "./how-it-works-card";

export function BannerSection() {
  return (
    <div className={banner.container}>
      <div className={banner.badge}> Turn Any PDF Into an Audio Playlist</div>
      <h1 className={banner.head}>
        Listen to documents instead of reading them
      </h1>

      <span className={banner.desc}>
        Upload PDFs and instantly convert them into natural-sounding audio
        tracks organized as a playlist. Learn on the go, save time, and absorb
        information while commuting, exercising, or working.
      </span>

      <div className={banner.how_it_works}>
        <Card label="Upload" icon={IoCloudUploadOutline} />
        <Card label="Convert" icon={MdOutlinePublishedWithChanges} />
        <Card label="Lsiten" icon={IoEarOutline} />
      </div>

      <FileInput />
    </div>
  );
}
