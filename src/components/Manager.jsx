import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  
  const getPasswords = async() => {
    let req= await fetch("https://passprotect-mern.onrender.com/")
    let passwords= await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  
  }

  useEffect(() => {
    getPasswords()
    let passwordArray;
    
  }, [])

  const copyText = (text) => {
    toast('🦄 Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce
        });
    navigator.clipboard.writeText(text)
    }

  const showPassword = () => {
    passwordRef.current.type ="text"
    
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type ="text"
    } else {
      ref.current.src = "icons/eyecross.png";
        passwordRef.current.type ="password"
    }
  };

  const savePassword = async() => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
     console.log(form.id)
     //if any such id exists in database ,delete it 
     if(form.id!=null)
      await fetch("https://passprotect-mern.onrender.com/", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id: form.id })})
     
     
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
     await fetch("https://passprotect-mern.onrender.com/", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ...form, id: uuidv4() })})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      setform({ site: "", username: "", password: "" });

      toast('🦄 Password saved successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      //for error pop up
      toast('Error: Password not saved! Please fill all fields correctly.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = async (id) => {
    //popup for delete confirmation
    let c=confirm("Do you really want to delete this password?")
    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id!=id));
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)));
    
    // fetching from backend deployed on render.com
    let res=await fetch("https://passprotect-mern.onrender.com/", {method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ id })})

    //for delete pop up
    toast('🦄Password deleted successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce
       
        });
    }
  };

  const editPassword = (id) => {
    setform({...passwordArray.filter(i=>i.id===id)[0],id: id}) 
    setPasswordArray(passwordArray.filter(item=>item.id!==id)) 
}


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
     <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />
      {" "}
      {/*this div for the background taken from https://bg.ibelick.com/ an the the color is self modified */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
       linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <div
          className="absolute left-0 right-0 top-0 -z-10 
       m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"
        ></div>
      </div>
      <div className="p-2  md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span></span>Pass<span className="text-green-700">Protect/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className="bg-white text-black rounded-full 
          border border-green-500 w-full p-4 py-1" type="text"  name="site"  id="site" />

        <div className="flex flex-col md:flex-row w-full justify-between gap-8"><input value={form.username} onChange={handleChange} placeholder="Enter username"
              className="bg-white text-black rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" id="username" />

        <div className="relative"> <input ref={(passwordRef)} value={form.password} onChange={handleChange} placeholder="Enter password" className="bg-white
             text-black rounded-full border border-green-500 w-full p-4 py-1" type="password" name="password" id="password"/>
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword} > 
                <img ref={ref} className="p-1" width={28} src="icons/eye.png" alt="eye"/>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 rounded-full px-4 
          py-1 w-fit border border-green-900"
          >
            {/* icon taken from lord icons */}
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                             return <tr key={index}>
                 {/* ********************************************************************************************************************** */}
                             <td className='py-2 border border-white text-center'>
                             <div className='flex items-center justify-center '>
                              <a href={item.site} target='_blank'>{item.site}</a>
                              <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                  <lord-icon
                                       style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                       src="https://cdn.lordicon.com/iykgtsbt.json"
                                       trigger="hover" >
                                  </lord-icon>
                                 </div>
                             </div>
                             </td>
                     {/* ********************************************************************************************************************** */}
                             <td className='py-2 border border-white text-center'>
                                <div className='flex items-center justify-center '>
                                    <span>{item.username}</span>
                                   <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                        <lord-icon
                                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                          src="https://cdn.lordicon.com/iykgtsbt.json"
                                          trigger="hover" >
                                        </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                     {/* ************************************************************************************************************  */}
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                       {/* ****************************************************************************************************************** */}

                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
      </div>
    </>
  );
};

export default Manager;


/*  for copy icon taken from lord icons( alternate)
<script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/depeqmsz.json"
    trigger="hover"
    style="width:250px;height:250px">
</lord-icon>*/




