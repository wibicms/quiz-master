class NewQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      answer: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/questions/',{
      question: {
        content: this.state.content,
        answer: this.state.answer
      }
    }).then(response => {
      if(response.data.status == 201){
        this.setState({message: 'New Question Added.', content: '', answer: ''});
      }else{
          this.setState({message: 'There is a problem, please try again.', content: '', answer: ''});
      }

    }).catch(
      error => console.log(error)
    );
  }

  render() {
    return (<div>
      <h1>Add New Question</h1>
      <p>{this.state.message}</p>
      <div>
        <label>Content</label>
        <input type="text" name="content" onChange={this.handleChange}/>
      </div>
      <div>
        <label>Answer</label>
        <input type="text" name="answer" onChange={this.handleChange}/>
      </div>
      <input type="submit" value="Save" onClick={this.handleSubmit}/>
    </div>)
  }
}
