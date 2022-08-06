import { useEffect, useState } from "react";
import "./slider.css";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const Slider = () => {
  const { data, isLoading } = useFeaturedBanners();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data.results !== undefined) {
      let items = data.results.map((row) => {
        return {
          original: row.data.main_image.url,
          thumbnail: row.data.main_image.url,
        };
      });
      setItems(items);
    }
  }, [data]);

  return (
    <div className="slider">
      {isLoading && <div>Loading...</div>}
      {items && (
        <div data-testid="slider-items" className="slider-items">
          <ImageGallery
            items={items}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            autoPlay={true}
            showBullets={true}
            showThumbnails={false}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
