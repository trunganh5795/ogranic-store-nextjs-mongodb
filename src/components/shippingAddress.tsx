import React, { Dispatch, SetStateAction } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Address } from "../pages/checkout";
interface ShippingAddressProps {
  setShowAddList: Dispatch<SetStateAction<boolean>>;
  address: Address;
}
export default function ShippingAddress({
  setShowAddList,
  address,
}: ShippingAddressProps) {
  console.log(address);
  return (
    <Card className="shipping__address__card mb-3">
      <Card.Body>
        <div className="row">
          <div className="col-10">
            <ul>
              <li>
                <strong>Reciever:</strong> <span>{address.name}</span>
              </li>
              <li>
                <strong>Address:</strong>{" "}
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
              ""
            )}

            <p
              className="change__address_btn my-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowAddList(true);
              }}
            >
              Change
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
