class EditQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      content: '',
      answer: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/v1/questions/' + this.state.id).then(response => {
      this.setState({content: response.data.content, answer: response.data.answer})
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
        this.setState({message: 'Question Updated.'});
      } else {
        this.setState({message: 'There is a problem, please try again.'});
      }
    }).catch(error => console.log(error));
  }

  render() {
    return (<div>
      <h1>Edit Question</h1>
      <p>{this.state.message}</p>
      <div>
        <label>Content</label>
        <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
      </div>
      <div>
        <label>Answer</label>
        <input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}/>
      </div>
      <input type="submit" value="Save" onClick={this.handleSubmit}/>
    </div>)
  }
}
