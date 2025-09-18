import React from 'react'
import './post.css'
import {useState, useEffect} from 'react'
import { Card, CardBody, Form, Input, Label,Container,Button } from 'reactstrap'
import { getCategories } from './Services/category-service';
import TextEditor from './TextEditor';
function Post() {

     const [categories,setCategories] = useState([]);
 
     useEffect(
        ()=>{
          getCategories().then((data)=>{
            setCategories(data)
            console.log(data)
          }).catch(error=>{
            console.log(error)
          })
        },
        []
      )


  return (
    <div className='wrapper'>

     <Container>
     <h1>Add Post</h1>
     <Card>
        <CardBody>
          <Form>
            <div className='title'>
              <Label for='title'>Post title</Label>
              <Input type='text' placeholder='Enter post title' id='title' />
            </div>
            <div className='title'>
              <Label for='content'>Post content</Label>
               <TextEditor/>
            </div>
            <div className='title1'>
              <Label for='category'>Post category</Label>
              <Input type='select' id='category'>
                <option value="">Select Category</option>
                {categories.map((category, index) => (
              <option key={index} value={category.category_id}>
                {category.category_title}
              </option>
            ))}
              </Input>
            </div>
            <Container>
                <Button className='button'>Create Post</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
     </Container>
    </div>
  )
}

export default Post
