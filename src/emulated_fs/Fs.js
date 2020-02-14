
import FsNode from "./FsNode";

import aboutContent from './files/about';
import projectsContent from './files/projects';
import contactContent from './files/contact';

const root = new FsNode('', 'folder');
const home = new FsNode('home', 'folder', root);
const user = new FsNode('user', 'folder', home);

const about = new FsNode('about.html', 'file', user);
about.associateContent(aboutContent);

const projects = new FsNode('projects.html', 'file', user);
projects.associateContent(projectsContent);

const contact = new FsNode('contact.html', 'file', user);
contact.associateContent(contactContent);

export default root;