import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const ArticleForm = ({history}) => {

    const initialState = { title: '', text: '' };
    const [values, setValues] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json '},
            body: JSON.stringify(values),
    })
    // .then(response => {
    //     if (response.ok) {
    //         alert('Article succesfully created')
    //         setValues(initialState)
    //     }
    // })
  .then(response => {
      if (response.ok) {
          alert('Article succesfully created')
          return response.json()
                    .then(article => {
                        history.push(`/articles/${article._id}`)
                    })
      }
  })
    .catch(error => alert(error))
};

return (
    
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="email"
            placeholder="Article Prototype"
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Text for your article"
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default ArticleForm;