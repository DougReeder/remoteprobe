// const Foo = {
//   name: 'foo',
//   builder: function (privateClient, publicCLient) {
//     return {
//       exports: {
//         upsert(obj) {
//
//         }
//       }
//     }
//   }
// }


const remoteStorage = new RemoteStorage();

remoteStorage.access.claim('foo', 'rw');
remoteStorage.caching.enable('/foo/');

const widget = new Widget(remoteStorage);
widget.attach();

const client = remoteStorage.scope('/foo/');
client.declareType('foo', {
  "type": "object"
});

const outputEl = document.getElementById('output');

hammer();

async function hammer() {
  const fullText = `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them.`;

  let i=0;
  const timer = setInterval(() => {
    try {
      const text = fullText.slice(0, ++i);
      outputEl.innerText = text;
      // doesn't wait for promise to be fulfilled, as keyboard events don't wait
      client.storeObject('foo', 'bar', {spam: text});
      console.log(i, text);

      if (i >= fullText.length) {
        clearInterval(timer);
      }
    } catch (err) {
      console.error(err);
    }
  }, 300);
  // 146 ms/char = 82 wpm; average is 41
  // 55 ms/char = 218 wpm; fastest human is 216 wpm
}
