class NewQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      content: '',
      answer: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/v1/questions/random')
    .then(response => {
      this.setState({id: response.data.id, content: response.data.content, answer: response.data.answer})
    }).catch(error => console.log(error))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/questions/'+this.state.id+'/answer', {
      answer: this.state.answer
    }).then(response => {
      if (response.status == 200) {
        this.setState({message: response.data.message});
      } else {
        this.setState({message: 'There is a problem, please try again.'});
      }
    }).catch(error => console.log(error));
  }

  render() {
    return (<div>
      <h1>Quiz!!</h1>
      <p>{this.state.message}</p>
      <div>
        <label>Content</label>
        <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
      </div>
      <div>
        <label>Answer</label>
        <input type="text" name="answer" onChange={this.handleChange}/>
      </div>
      <input type="submit" value="Save" onClick={this.handleSubmit}/>
    </div>)
  }
}
