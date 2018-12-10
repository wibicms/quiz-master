class NewQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      answer: '',
      message: '',
      alertStatus: 'success'
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/questions/', {
      question: {
        content: this.state.content,
        answer: this.state.answer
      }
    }).then(response => {
      if (response.status == 201) {
        this.setState({message: 'New Question Added.', content: '', answer: '', alertStatus: 'success'});
      } else {
        this.setState({message: 'There is a problem, please try again.', content: '', answer: '', alertStatus: 'warning'});
      }

    }).catch(error => console.log(error));
  }

  render() {
    return (
        <div className="col-sm-6">
          { this.state.message != "" ?
            <div className={"alert alert-"+this.state.alertStatus} role="alert">
              {this.state.message}
            </div>
            : ''
          }
          <h1>Add New Question</h1>
          <div className="form-group">
            <label>Content</label>
            <input type="text" name="content" onChange={this.handleChange} placeholder="Input Question" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Answer</label>
            <input type="text" name="answer" onChange={this.handleChange} placeholder="Input Answer" className="form-control"/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
