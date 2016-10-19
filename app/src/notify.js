export default function notify(message) {
  new Notification("Harvest Cube", {
    body: message
  });
}
