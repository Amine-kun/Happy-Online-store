import React, {useState} from 'react';
import './Upload.css';
import {AiOutlineCloudUpload} from 'react-icons/ai';

import RequiredLogin from '../RequiredLogin/RequiredLogin'

const iconsMap =["Shirts","Hoodies","Pants","Shoes","Accessories","Hats","Tech","Others"]

const Upload =()=> {    

  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [isColors, setIsColors] = useState(false);
  const [isSizes, setIsSizes] = useState(false);

  const [success, setSuccess] = useState(false);

   const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

   const submitProduct = () =>{

      const data = new FormData();

        data.append('file', image);

        data.set('productName', productName);
        data.set('description', description);
        data.set('price', price);
        data.set('category', category);
        data.set('isColors', isColors);
        data.set('isSizes', isSizes);
        data.set('userName', userInfo.name);
        data.set('userId', userInfo._id);
        data.set('userImage', userInfo.userImage);
        console.log(productName,description,price,category,isColors,isSizes)

         fetch('http://localhost:3001/upload', {
          method:'post',
          body: data,
         }) 
            .then((res)=> res.json())
            .then((data)=> console.log(data))
   }

  return (
           <div className="upload-main">
             {userInfo?._id ? 
              <>
              <label className="image-upload-div">
                {image === null ?
                      <>
                        <AiOutlineCloudUpload/>
                        <input type="file" name="file" className="file"  onChange={(e)=>setImage(e.target.files[0])}/>
                      </> 
                      : <img src={URL.createObjectURL(image)} className="product-pic"/> }
             </label>
             <input type="text" name="productName" className="input" placeholder="Product name" onChange={(e)=>setProductName(e.target.value)}/>
             <input type="text" name="description" className="input" placeholder="About the product" onChange={(e)=>setDescription(e.target.value)}/>
             <input type="number" name="price" className="input" placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>

               <select className="input" onChange={(e)=>setCategory(e.target.value)}>
                <option value="others">Select Category</option>
                  {iconsMap.map((cate)=> <option key={cate} value={cate}>{cate}</option>) }
               </select>

              <div className="checkboxes">
                  <div className="">
                    <input type="checkbox" name="colors" value="Colors" onClick={()=>setIsColors(!isColors)}/>
                    <label htmlFor="colors"> Colors</label>
                  </div>

                  <div className="">
                    <input type="checkbox" name="sizes" value="Sizes" onClick={()=>setIsSizes(!isSizes)}/>
                    <label htmlFor="Sizes"> Sizes</label>
                  </div>
                </div>

                <button className="submit" onClick={()=>submitProduct()}>Submit</button> 
                </>
                : <RequiredLogin/>}
            </div> 
  );
}

export default Upload;