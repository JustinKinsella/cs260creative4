let app = new Vue({
    el: '#app',
    data: {
        addedName: '',
        addedAssignment: '',
        addedGrade: '',
        addedEvaluation: '',
        addedNotes: '',
        tickets: []
    },
    created(){
        this.getTickets();
    },
    methods: {
        async addTicket(){
            try {
                let response = await axios.post("http://localhost:5000/api/tickets", {
                  name: this.addedName,
                  assignment: this.addedAssignment,
                  grade: this.addedGrade,
                  evaluation: this.addedEvaluation,
                  notes: this.addedNotes,
                });
                console.log("ADD TICKET - RESPONSE: ",response);
                this.addedName = "";
                this.addedAssignment = "";
                this.addedGrade = "";
                this.addedEvaluation = "";
                this.addedNotes = "";
                this.getTickets();
                return true;
              } catch (error) {
                console.log(error);
              }
        },
        async deleteTicket(ticket) {
            try {
              let response = axios.delete("http://localhost:5000/api/tickets/" + ticket.id);
              console.log("I also made it here");
              this.getTickets();
              console.log("I break right here");
              return true;
            } catch (error) {
              console.log(error);
            }
        },
        async getTickets(){
          try {
            let response = await axios.get("http://localhost:5000/api/tickets");
            console.log("GET TICKET - RESPONSE: ",response);
            this.tickets = response.data;
          } catch (error) {
            console.log(error);
          }
        }
    }
});
