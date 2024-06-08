import React,{ useRef, useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { updateUserFailure,updateUserSuccess,updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch=useDispatch();
  const fileRef=useRef(null);
  const {currentUser}=useSelector((state)=>state.user);
  const {loading,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [formData,setFormData]=useState({});

  useEffect(()=>{
    if(file)
      {
        handleFileUpload(file);
      }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+ file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/
          snapshot.totalBytes)*100;
          setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>{
          setFormData({...formData,avatar:downloadURL});
        })
      }
    );
  }

  const handleChange=(event)=>{
    setFormData(
      {...formData,
      [event.target.id]:event.target.value}
    )
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{ 
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success===false)
        {
          dispatch(updateUserFailure(data.message));
          return;
        }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error)
    {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser=async()=>{
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE" 
      });
      const data=await res.json();
      if(data.success===false)
        {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess());
    }
    catch(error)
    {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut=async()=>{
    try{
      dispatch(signOutUserStart());
      const res=await fetch('/api/auth/signOut');  
      const data=await res.json();
      if(data.success===false)
        {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess());
    }
    catch(error)
    {
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center
      my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileUploadError?
          (<span className='text-red-700'>Error image upload
          (image must be less than 2MB)</span>)
        : 
        (filePerc>0 && filePerc<100?
      (<span className='text-slate-700'>
        {`Uploading ${filePerc}%`}
      </span>)
      :
      (filePerc===100 ?
        (<span className='text-green-700'>Image successfully uploaded!</span>)
      : ""
      ))
      }
        </p>
        <input type='text' placeholder='username' defaultValue={currentUser.username}
        className='p-3 border rounded-lg focus:outline-none' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' defaultValue={currentUser.email}
        className='p-3 border rounded-lg focus:outline-none' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' 
        className='p-3 border rounded-lg focus:outline-none' id='password' onChange={handleChange}/>
        <button disabled={loading} className='text-white bg-slate-700 rounded-lg p-3 
        uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading...':'Update'}
        </button>
        <Link to={'/create-listing'} className='bg-green-700 text-white p-3 rounded-lg uppercase 
        hover:opacity-95 text-center'>
          Create a listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'> 
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error?`${error}`:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess?
      'Profile updated successfully!':''}</p>
    </div>
  )
}

export default Profile;