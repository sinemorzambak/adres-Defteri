import React,{Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Consumer} from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Contact extends Component {
    
    constructor()
    {
        super();  
        this.state={
        showContactInfo : false
        };
        
    }
    

//arrow işlevini kullanmazsanız, bu anahtar kelime yalnızca onshowClick() için çalışmaz{}
  onShowClick=(e)=>
    {
        this.setState({showContactInfo:!this.state.showContactInfo});
        console.log(e);
    };

////Bir arrow işlevi için, parametrelerin önüne async koyarız
 onDeleteClick=async(id,dispatch,e)=>
    {
     
     // Hiçbir şey almadığımız için istek yanıtını bir değişkene kaydetmemize gerek yok
     try{
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        dispatch({type:'DELETE_CONTACT',payload:id}); 
     }
     catch(e)
         {
                    dispatch({type:'DELETE_CONTACT',payload:id}); 
 
         }
      
    };
  
render() {
      
      const {id,name,email,phone,home_address,work_address,twitter,instagram,facebook} =this.props.contact;
      const {showContactInfo} = this.state;
      //hatta this.props.branding'i kullanmak da işe yarar, ancak destructing daha temiz hale getirir.
        return(
            <Consumer>
            {value=>{
             const {dispatch}=value;
             return (
             <div className="card card-body mb-3">
            <h4>{name}{' '}
            <i 
            onClick={this.onShowClick}
            className="fa fa-sort-desc"
            style={{cursor:'pointer'}}
            ></i>
            <i className="fa fa-times" style={{cursor:'pointer',float:'right',color:'red'}}
            onClick={this.onDeleteClick.bind(this,id,dispatch)} ></i>
            
            <Link to={`contact/edit/${id}`} >
           
            <i 
            className='fa fa-pencil' 
            style={{
            cursor:'pointer',float:'right',color:'black',marginRight:'1rem'}}></i>
            
            </Link>
            </h4>

            {showContactInfo ? (
            <ul className="list-group">
            <li className='list-group-item'>Email : {email}</li>
            <li className='list-group-item'>Phone : {phone}</li>
            <li className='list-group-item'>Home Address : {home_address}</li>
            <li className='list-group-item'>Work Address : {work_address}</li>
            <li className='list-group-item'>Twitter : {twitter}</li>
            <li className='list-group-item'>Instagram : {instagram}</li>
            <li className='list-group-item'>Facebook : {facebook}</li>
            </ul>

            ):null}

            </div>
             )
            }}
            </Consumer>

            
        )
      
  }
    
    
}

//note default props sınıfın dışında tanımlanır.
Contact.defaultProps={
        name:'Priya',
        phone:'9450465058'
        
    }

Contact.propTypes ={
    
    contact:PropTypes.object.isRequired,
}
export default Contact;
