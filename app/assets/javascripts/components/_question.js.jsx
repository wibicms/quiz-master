class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            message: ''
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
      axios.get('/api/v1/questions')
      .then(response => {
            this.setState({questions: response.data})
        })
      .catch(error => console.log(error))
    }

    handleEdit(e){

    }

    handleDelete(question){
      axios.delete('/api/v1/questions/'+question.id)
      .then(response => {
        if(response.data.status == 200){

          //remove question from lits of question
          let questions = this.state.questions.filter(
            q => q.id !== question.id
          )
          this.setState({questions: questions, message: 'Question Deleted'})
        }else{
          this.setState({message: 'There is something wrong, please try agian later'});
        }
      })
      .catch(error => console.log(error))
    }

    renderQuestionItems(){
      var qustionItems = [];
      let number = 0;
      for (let i in this.state.questions ){
        let q = this.state.questions[i];
        number++;
        qustionItems.push(
          <QuestionItem
            key={i}
            number={number}
            question={q}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete} />);
      }
      return qustionItems;
    }

    render(){
        return(
          <div>
              <h1>List Question</h1>
              <a href="/questions/new">Add New Question</a>
              <p>{this.state.message}</p>
              <table border="1">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.renderQuestionItems() }
                </tbody>
              </table>
          </div>
        )
    }
}

class QuestionItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.question.content}</td>
        <td>{this.props.question.answer}</td>
        <td>
          <a href={'/questions/'+this.props.question.id+'/edit'}>Edit</a>
          <button onClick={() => this.props.onDelete(this.props.question)}>Delete</button>
        </td>
      </tr>
    );
  }
}
