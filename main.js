const routeConfig = {
          home: 'home',
          info: 'info',
          user: {
              list: 'user-list',
              edit: 'edit-user',
              create: 'create-user',
              threeLevel: {
                users: 'users-lists'
              }
          }
      },
      notFoundPageTemplateId = 'page-not-found',
      routedElement = $('main');

onHashChange();
$(window).on('hashchange', onHashChange);

function onHashChange() {
    const path = getHashPath(),
          templateId = getTemplateId(path, routeConfig) || notFoundPageTemplateId;

    setTemplate(routedElement, templateId);
}

function getTemplateId(path, route) {
    var id,
        current = path[0];
    if(path.length > 1 &&  route[current]) {
      path.shift();
        id = getTemplateId(path, route[current]);        
    } else {
      id = route[path[0]];
    }
    return id || undefined;
}

function getHashPath() {
    return location.hash.slice(1).split('/');
}

function setTemplate(destinationElement, templateId) {
    const temlateElement = document.getElementById(templateId);

    var clone = document.importNode(temlateElement.content, true);

    destinationElement.empty();
    destinationElement.append(clone);
}