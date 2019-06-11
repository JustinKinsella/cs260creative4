let app = new Vue({
    el: '#app',
    data: {
        addedName: '',
        addedProblem: '',
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
                  problem: this.addedProblem
                });
                console.log("ADD TICKET - RESPONSE: ",response);
                this.addedName = "";
                this.addedProblem = "";
                this.getTickets();
                return true;
              } catch (error) {
                console.log(error);
              }
        },
        async deleteTicket(ticket) {
            try {
              let response = axios.delete("http://localhost:5000/api/tickets/" + ticket.id);
              this.getTickets();
              return true;
            } catch (error) {
              console.log(error);
            }
        },
        async getTickets(){
            let response = await axios.get("http://localhost:5000/api/tickets");
            console.log("GET TICKET - RESPONSE: ",response);
            this.tickets = response.data;
        }
    }
});
