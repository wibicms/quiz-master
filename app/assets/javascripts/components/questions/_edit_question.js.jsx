class EditQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      content: '',
      answer: '',
      message: '',
      alertStatus: 'success'
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
        this.setState({message: 'Question Updated.', alertStatus: 'success'});
      } else {
        this.setState({message: 'There is a problem, please try again.', alertStatus: 'warning'});
      }
    }).catch(error => console.log(error));
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
          <input type="text" name="content" value={this.state.content} className="form-control" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label>Answer</label>
          <input type="text" name="answer" value={this.state.answer} className="form-control" onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Save" className="btn btn-primary" onClick={this.handleSubmit}/>
    </div>)
  }
}
