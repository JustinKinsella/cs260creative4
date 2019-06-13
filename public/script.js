let app = new Vue({
    el: '#app',
    data: {
        addedName: '',
        addedAssignment: '',
        addedGrade: "Grade",
        addedEvaluation: '',
        addedNotes: '',
        tickets: [],
    },
    created(){
        this.getTickets();
    },
    methods: {
        async addTicket(){
            try {
                let response = await axios.post("/api/tickets", {
                  name: this.addedName,
                  assignment: this.addedAssignment,
                  grade: this.addedGrade,
                  evaluation: this.addedEvaluation,
                  notes: this.addedNotes,
                });
                console.log("ADD TICKET - RESPONSE: ",response);
                this.addedName = "";
                this.addedAssignment = "";
                this.addedGrade = "Grade";
                this.addedEvaluation = "";
                this.addedNotes = "";
                this.getTickets();
                window.location.reload(true); //Forces page to reload from server instead of cache
                return true;
              } catch (error) {
                console.log(error);
              }
        },
        async deleteTicket(ticket) {
            try {
              let response = axios.delete("/api/tickets/" + ticket.id);
              this.getTickets();
              window.location.reload(true); //Forces page to reload from server instead of cache
              return true;
            } catch (error) {
              console.log(error);
            }
        },

        async editItemA(ticket) {
          try {
            let response = await axios.put("/api/tickets/" + ticket.id, {
              grade: "A",
              name: ticket.name,
              assignment: ticket.assignment,
              evaluation: ticket.evaluation,
              notes: ticket.notes,

            });
            this.getTickets();
            window.location.reload(true); //Forces page to reload from server instead of cache

            return true;
          } catch (error) {
            console.log(error);
          }
        },

        async editItemF(ticket) {
          try {
            let response = await axios.put("/api/tickets/" + ticket.id, {
              grade: "F",
              name: ticket.name,
              assignment: ticket.assignment,
              evaluation: ticket.evaluation,
              notes: ticket.notes,
            });
            this.getTickets();
            window.location.reload(true); //Forces page to reload from server instead of cache

            return true;
          } catch (error) {
            console.log(error);
          }
        },

        async getTickets(){
          try {
            let response = await axios.get("/api/tickets");
            const myObj = JSON.stringify(response.data);
            console.log("GET TICKET - RESPONSE: ", JSON.parse(myObj));

            this.tickets = JSON.parse(myObj);
          } catch (error) {
            console.log(error);
          }
        }
    }
});
