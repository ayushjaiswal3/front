import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../Services/Const';
import {
    Col,
    Row,
    Container,
    CardBody,
    Card,
    CardText
  } from "reactstrap";
import { loadPost } from '../Services/post-service';

function Postpage() {
     const {postId}=useParams()
     const [post,setPost] = useState(null);

     useEffect(()=>{
       loadPost(postId).then(data=>{
        setPost(data);
        console.log(data);
       }).then(error=>{
        console.log(error);
       })
     },[])

     const printDate=(numbers)=>{
         return new Date(numbers).toLocaleDateString()
     }

  return (
    <Container>
        <Row>
            <Col md={{
                size:12
            }}>
                <Card className='mt-3'>
                 {
                  (post) &&  <CardBody>
                  <CardText> Posted By <b>{post.user.name}</b> on  <b>{printDate(post.date)}</b></CardText>
                   <CardText><h3>{post.title}</h3></CardText>
                   <div className="imgcontainer mt-3 text-center" style={{widows:'50%'}}>
                  
                    <img src={BASE_URL+'/api/post/img/'+ post.image} alt="" width='465px'/>
                   </div>
               </CardBody>
                 }
                </Card>
            </Col>
        </Row>
        <Row className='mt-8'>
          <Col md={{
            size:8,
            offset:2
          }}>
            <h1>This is the comments sections of this <b>{post?.title}</b></h1>
            {
              post?.comments && post.comments.map(c=>(
                <Card>
                  <CardBody>
                    <CardText>
                          {c.content}
                    </CardText>
                  </CardBody>
                </Card>
              ))
            }
           </Col>
        </Row>
    </Container>
  )
}

export default Postpage
