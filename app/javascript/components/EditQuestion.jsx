import React from 'react';
import axios from 'axios';

import {EditorState, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

class EditQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      content: '',
      answer: '',
      message: '',
      alertStatus: 'success',
      editorState: EditorState.createEmpty()
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/v1/questions/' + this.state.id).then(response => {
      let contentBlock = htmlToDraft(response.data.content);
      if (contentBlock) {
        let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        let editorState = EditorState.createWithContent(contentState);
        this.setState({content: response.data.content, answer: response.data.answer, editorState})
      }
    }).catch(error => console.log(error))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.put('/api/v1/questions/'+this.state.id, {
      question: {
        content: this.state.content,
        answer: this.state.answer
      }
    }).then(response => {
      if (response.status == 200) {
        this.setState({message: 'Question Updated.', alertStatus: 'success'});
      } else {
        this.setState({message: 'There is a problem, please try again.', alertStatus: 'warning'});
      }
    }).catch(error => console.log(error));
  }

  onEditorStateChange = (editorState) => {
    this.setState({editorState});
  }

  render() {
    return (
      <div className="col-sm-6">
        <h1>Edit Question</h1>
          { this.state.message != "" ?
            <div className={"alert alert-"+this.state.alertStatus} role="alert">
              {this.state.message}
            </div>
            : ''
          }
        <div className="form-group">
          <label>Content</label>
          <Editor editorState={this.state.editorState} wrapperClassName="demo-wrapper" editorClassName="editer-content" onEditorStateChange={this.onEditorStateChange}/>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input type="text" name="answer" value={this.state.answer} className="form-control" onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Save" className="btn btn-primary" onClick={this.handleSubmit}/>
    </div>)
  }
}

export default EditQuestion;
