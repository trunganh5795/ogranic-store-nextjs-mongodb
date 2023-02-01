import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { ALL_DEPARTMENTS } from "../configs/constants";
export default function RightMenu() {
  const ulRef = useRef<HTMLUListElement>(null);
  const { asPath } = useRouter();
  const [isShow, setIsShow] = useState(asPath === "/" ? true : false);
  useEffect(() => {
    setIsShow(asPath === "/" ? true : false);
    return () => {};
  }, [asPath]);

  return (
    <div className="hero__categories">
      <div className="hero__categories__all">
        <i>
          <FontAwesomeIcon icon={faBars} />
        </i>
        <span>All departments</span>
        <button
          onClick={() => {
            setIsShow((prev) => !prev);
          }}>
          <AiOutlineDown className={isShow ? "" : "spin"} />
        </button>
      </div>
      <ul ref={ulRef} className={isShow ? "" : "hide__menu"}>
        {ALL_DEPARTMENTS.map((item, index) => (
          <li key={index}>
            <Link href={{ pathname: item.pathname, query: item.query }}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
