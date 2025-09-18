import React from 'react';
import { Button, Card, CardBody, CardText, CardFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
function Posts({postId, title = "Default Title", content = "Default Content" }) {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Card
        className="mb-3"
        style={{
          boxShadow: '0 4px 15px rgba(0, 0, 0, 1)', 
          border: 'none',
          transition: 'transform 0.3s',
          width: '400px',
          textAlign: 'center',
          margin: '22px',
          padding: '12px',
          borderRadius: '15px',
          backgroundColor: '#fff',
        }}
      >
        <CardBody>
     {title}
  <CardText dangerouslySetInnerHTML={{ __html: content.substring(0, 60) }} />
</CardBody>

        <CardFooter className="d-flex justify-content-center">
          <Link className='btn btn-primary border-0' to={"/postpage/"+postId}>Read more</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Posts;
