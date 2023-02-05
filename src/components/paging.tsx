import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { ITEM_PER_PAGE } from '../configs/constants';

export default function Paging({
  currentPage,
  total,
}: {
  currentPage: number;
  total: number;
}) {
  const route = useRouter();
  let [pagingArr, setPagingArr] = useState<(string | number)[]>([1]);

  useEffect(() => {
    let totalPage = Math.ceil(total / ITEM_PER_PAGE);
    let newPagingArr: (string | number)[] = [1];
    if (currentPage - 2 <= 2) {
      for (let i = 2; i <= currentPage; i++) {
        newPagingArr.push(i);
      }
    } else {
      newPagingArr.push('...');
      for (let i = currentPage - 2; i <= currentPage; i++) {
        newPagingArr.push(i);
      }
    }

    if (currentPage + 3 >= totalPage) {
      for (let i = currentPage + 1; i <= totalPage; i++) {
        newPagingArr.push(i);
      }
    } else {
      newPagingArr.push(currentPage + 1);
      newPagingArr.push(currentPage + 2);
      newPagingArr.push('...');
      newPagingArr.push(totalPage);
    }
    setPagingArr([...newPagingArr]);
    return () => {};
  }, [currentPage, total]);

  return (
    <>
      <Link
        href={{
          pathname: route.pathname,
          query: { ...route.query, page: currentPage - 1 },
        }}>
        <AiOutlineArrowLeft />
      </Link>

      {pagingArr.map((item, index) => (
        <Link
          className={`${typeof item === 'string' ? 'disabled' : ''} ${
            item === currentPage ? 'active' : ''
          }`}
          key={index}
          href={{
            pathname: route.pathname,
            query: { ...route.query, page: item },
          }}>
          {item}
        </Link>
      ))}

      <Link
        href={{
          pathname: route.pathname,
          query: { ...route.query, page: currentPage + 1 },
        }}>
        <AiOutlineArrowRight />
      </Link>
    </>
  );
}
