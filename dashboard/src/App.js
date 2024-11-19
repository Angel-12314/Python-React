import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './index.css';
import Form from 'react-bootstrap/Form';

function App() {
    const [formData, setFormData] = useState({ name: '', age: '', file: null });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('age', formData.age);
        if (formData.file) {
            data.append('file', formData.file);
        }

        try {
            const res = await axios.post('http://localhost:5000/submit', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
      
        <div className='div1' style={{ padding: '20px',justifyContent:'center', backgroundImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIeLk6298lICzNmQKj7WYsOFcRotaCL7Qu6A&s'}}>
          <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label><br/>
              <input style={{width:'400px', height:"40px", borderRadius:'10px'}} onChange={handleChange} type="name" name="name" placeholder="Name" /><br/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label><br/>
              
              <select style={{width:'400px', height:"40px", borderRadius:'10px'}}name="age" onChange={handleChange} required>
                <option value="" disabled selected>age</option>
                  {[...Array(100).keys()].map((age) => (
                <option key={age} value={age + 1}>
                {age + 1}
                </option>
        ))}
    </select>
            </Form.Group>

            <Form.Group>
              <Form.Label>File</Form.Label><br/>
              <input style={{width:'400px', height:"40px", borderRadius:'10px'}} onChange={handleChange} name="File" type="file" /><br/>
            </Form.Group><br/>
      
              <Button onSubmit={handleSubmit} type="submit">
                Submit
              </Button>
            </Form>

            {response && (
                <div style={{ marginTop: '20px'}}>
                    <h2>Form Details:</h2>
                    <p><b>Name:</b> {response.name}</p>
                    <p><b>Age:</b> {response.age}</p>
                    <p><b>File:</b> {response.file}</p>
                </div>
            )}
        </div>
      </div>
    );
}

export default App;
