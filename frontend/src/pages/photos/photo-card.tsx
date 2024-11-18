import { Photo } from "@/types/photos";

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <div className="space-y-3 w-[150px] h-auto">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        width={150}
        height={150}
        className={
          "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
        }
      />
      <div className="space-y-1 text-sm">
        <p className="text-xs text-muted-foreground">{photo.title}</p>
      </div>
    </div>
  );
};
