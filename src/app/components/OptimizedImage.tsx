import { type PhotoSet } from "../data/landing";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

interface OptimizedImageProps extends Omit<ImgProps, "src"> {
  photo: PhotoSet;
  alt: string;
}

export function OptimizedImage({ photo, alt, className, style, ...rest }: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={photo.webp} type="image/webp" />
      <source srcSet={photo.png} type="image/png" />
      <img
        src={photo.png}
        alt={alt}
        className={className}
        style={style}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    </picture>
  );
}
