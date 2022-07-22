import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../Components/Rating'
import products from '../products'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductScreen = () => {
  let params = useParams() 
  console.log("ppp",params)
 //const product = products.find((p) => p._id === params.id )
 

const[product,setProduct] =useState([])

 useEffect(()=>{
  const fetchProduct = async() =>{
    const {data} = await axios.get(`https://fakestoreapi.com/products/${params.id}`)
    setProduct(data)
  }
  fetchProduct()
 },[])

 return (<>
   <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
  <Row>
    <Col md={6}>
       <Image src={product.image} alt={product.name} fluid></Image>
    </Col>

    <Col md={3}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>{product.title}</h2>
        </ListGroup.Item>

        <ListGroup.Item>
           <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
        </ListGroup.Item>

        <ListGroup.Item>
          Price : ${product.price}  
         
        </ListGroup.Item>

        <ListGroup.Item>
          Description : {product.description}
        </ListGroup.Item>
      </ListGroup>
    
    </Col>

    <Col md={3}>
     <Card> 
     <ListGroup>
       <ListGroup.Item>
        <Row>
          <Col>
          Price
          </Col>
          <Col>
            <strong>$ {product.price}</strong>
          </Col>
        </Row>
       </ListGroup.Item>
     </ListGroup>

     
       <ListGroup.Item>
        <Row>
          <Col>
          Status :
          </Col>
          <Col>
            {product.countInStock > 0 ? 'In Stock' :'Out of Stock' }
          </Col>
        </Row>
       </ListGroup.Item>
     
      
       <ListGroup.Item>
         <Button className='btn-block' type='button' disabled={product.countInStock == 0}>
          Add to Cart
          </Button>
       </ListGroup.Item>
     </Card>
    </Col>
  </Row> 
    
  
  </>
  
)};

export default ProductScreen