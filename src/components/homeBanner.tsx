import Image from "next/image";
import React from "react";

export default function HomeBanner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 position-relative">
            {/* <div className="banner__pic position-relative"> */}
            {/* <Image
              src="/assets/img/banner/banner-1.jpg"
              alt="banner"
              fill={true}
            /> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/banner/banner-1.jpg" alt="banner" />
            {/* </div> */}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 position-relative">
            {/* <div className="banner__pic position-relative"> */}
            <div className="w-100 position-relative">
              {/* <Image
                src="/assets/img/banner/banner-2.jpg"
                alt="banner"
                fill={true}
              /> */}
              <img src="/assets/img/banner/banner-2.jpg" alt="banner" />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
