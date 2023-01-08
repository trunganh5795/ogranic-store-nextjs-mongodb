import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
export default function ShippingAddress({ setShowAddList }) {
  return (
    <Card className="shipping__address__card">
      <Card.Body>
        <div className="row">
          <div className="col-10">
            <ul>
              <li>
                <strong>Reciever:</strong> <span>Trung Anh</span>
              </li>
              <li>
                <strong>Address:</strong> <span>Trung Anh</span>
              </li>
              <li>
                <strong>Phone:</strong> <span>Address</span>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <Badge pill bg="primary">
              Default
            </Badge>
            <p
              className="change__address_btn my-2"
              onClick={() => {
                setShowAddList(true);
              }}>
              Change
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
