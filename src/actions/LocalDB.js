
function LocalDB(){
    const db_name = "locations";
    const that = {};
    let idb = null;
    const init = () => {
      const promise = new Promise( (resolve, reject) => {
        const open = window.indexedDB.open(db_name, 1);
        open.onupgradeneeded = () => {
          idb = open.result;
          idb.createObjectStore( db_name, { keyPath: "id", autoIncrement: true});
        };
        open.onsuccess = () => {
          idb = open.result;
          resolve( true);
        };
      });
      return promise;
    };

    const create = ( data) => {
      const promise = new Promise( ( resolve, reject) => {
        const tx = idb.transaction( db_name, "readwrite");
        const store = tx.objectStore( db_name);
        store.add( data)
        .onsuccess = (event) => {
          resolve( event.target.result);
        };
      });
      return promise;
    };

    const editLocation = (data) => {
        console.log('edit: ', data);
        const promise = new Promise( ( resolve, reject) => {
            const tx = idb.transaction( db_name, "readwrite");
            const store = tx.objectStore( db_name);
            store.put( data)
            .onsuccess = (event) => {
              resolve( event.target.result);
            };
        });
        return promise;
    }

    const deleteLocation = (id) => {
      const promise = new Promise( (resolve, reject) => {
        const tx = idb.transaction( db_name, "readwrite");
        const store = tx.objectStore( db_name);
        store.delete( id);
        tx.oncomplete = (e) => {
          resolve( e.target.result);
        };
      });
      return promise;
    };

    const get = () => {
      const promise = new Promise( ( resolve, reject) => {
        const tx = idb.transaction( db_name, "readonly");
        const store = tx.objectStore( db_name);
        let locations = [];
        store.openCursor().onsuccess = (event) => {
          const cur = event.target.result;
          if( cur){
            locations.push( cur.value);
            cur.continue();
          } else {
            resolve( locations);
          }
        };
      });
      return promise;
    };

    const close = () => {
      idb.close();
    };

    that.init = init;
    that.close = close;
    that.getAll = get;
    that.create = create;
    that.edit = editLocation;
    that.deleteLocation = deleteLocation;
    return that;
  }
  
  export default LocalDB();
  