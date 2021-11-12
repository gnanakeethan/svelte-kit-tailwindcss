import {createServer} from "miragejs"

export default function () {
    createServer({
        routes() {
            this.passthrough('https://api.mapbox.com/**');
            this.urlPrefix = import.meta.env.VITE_BASE_URL as string;
            // this.get("/api/reminders", () => ({
            //     reminders: [
            //         {id: 1, text: "Walk the dog"},
            //         {id: 2, text: "Take out the trash"},
            //         {id: 3, text: "Work out"},
            //     ],
            // }))
        },
    })
}
