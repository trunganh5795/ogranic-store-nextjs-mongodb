import React, { Dispatch, SetStateAction } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { Address } from '../configs/type';

interface ShippingAddressProps {
  setShowAddList?: Dispatch<SetStateAction<boolean>>;
  selectAddress?: Dispatch<
    SetStateAction<{ index: number; isSelected: boolean }>
  >;
  address: Address;
  isSelected: boolean;
  index: number;
}

export default function ShippingAddress({
  setShowAddList,
  selectAddress,
  address,
  isSelected,
  index,
}: ShippingAddressProps) {
  return (
    <Card
      className={`shipping__address__card mb-3 border border-2 + ${
        isSelected ? 'border-success' : ''
      }`}>
      <Card.Body>
        <div className="row">
          <div
            tabIndex={0}
            role="button"
            className="col-10"
            onKeyDown={() => {}}
            onClick={() => {
              if (isSelected && selectAddress) {
                selectAddress((prev) => {
                  const newState = { ...prev };
                  newState.isSelected = false;
                  return { ...newState };
                });
              } else if (selectAddress) {
                selectAddress({ index, isSelected: true });
              }
            }}>
            <ul>
              <li>
                <strong>Reciever:</strong> <span>{address.name}</span>
              </li>
              <li>
                <strong>Address:</strong>{' '}
                <span>{`${address.address} - ${address.state} - ${address.city}`}</span>
              </li>
              <li>
                <strong>Phone:</strong> <span>{address.phone} </span>
              </li>
            </ul>
          </div>
          <div className="col-2">
            {address.defaultAdd ? (
              <Badge pill bg="primary">
                Default
              </Badge>
            ) : (
              ''
            )}
            <br />
            <button
              type="button"
              className="badge rounded-pill bg-danger my-2"
              onClick={() => {
                if (setShowAddList) setShowAddList(true);
              }}>
              Change
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
ShippingAddress.defaultProps = {
  setShowAddList: undefined,
  selectAddress: undefined,
};
