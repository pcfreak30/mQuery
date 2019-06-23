// Merge all of the nodes that the callback return into a simple array
mq.extend({
            flatten: function (items) {
              return items.reduce(function (list, node, i) {
                var isMQ;
                var isDOM = typeof node === HTMLElement || typeof node === HTMLDocument;
                if (!node) {
                  node = false;
                }
                if (typeof node === 'string') {
                  node = mq(node);
                }
                if ((isMQ = (node instanceof mq))) {
                  node = node.nodes;
                }
                if (isDOM && !isMQ && isArrayLike(node)) {
                  node = mq.flatten(node);
                }
                return list.concat(node !== false ? node : []);
              }, []);
            }
          });
