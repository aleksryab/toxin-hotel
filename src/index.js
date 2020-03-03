import 'normalize.css';
import './scss/main.scss';

function importAll(requireContext) {
  requireContext.keys().map(requireContext);
}

importAll(require.context('./components/', true, /\.js$/));
importAll(require.context('./pages/', true, /\.js$/));

