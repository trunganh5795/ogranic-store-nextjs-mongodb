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
  isSelected: Boolean;
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
            className="col-10"
            onClick={() => {
              console.log(index);
              if (isSelected && selectAddress) {
                selectAddress((prev) => {
                  prev.isSelected = false;
                  return { ...prev };
                });
              } else if (selectAddress) {
                selectAddress({ index: index, isSelected: true });
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

            <p
              className="change__address_btn my-2"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (setShowAddList) setShowAddList(true);
              }}>
              Change
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
