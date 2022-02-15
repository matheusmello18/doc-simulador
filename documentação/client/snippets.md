# Snippets

> File > Preferences > User Snippets
> Selecione o tipo da programação

# Snippets React

```
{
	"React Component" : {
		"prefix": "my-react-component",
		"description": "Criação do Component em React",
		"body" : [
			"import React from \"react\";",
			"import PropTypes from \"prop-types\";",
			"",
			"const ${TM_FILENAME_BASE} = ($1) => {",
			"  $2",
			"};",
			"",
			"${TM_FILENAME_BASE}.defaultProps = {}",
			"",
			"${TM_FILENAME_BASE}.propTypes = {}",
			"",
			"export default ${TM_FILENAME_BASE};"
		]
	},

	"React Component StoryBook" : {
		"prefix": "my-react-component-storybook",
		"description": "Criação do StoryBook Component em React",
		"body" : [
			"import React from \"react\";",
			"import ${TM_FILENAME_BASE/(.stories)//} from \"components/${1|atoms,atoms/dashboard,molecules,pages|}/${TM_FILENAME_BASE/(.stories)//}\";",
			"",
			"export default {",
  		"  title: \"Components/${1|atoms,atoms/dasboard,molecules,pages|}/${TM_FILENAME_BASE/(.stories)//}\",",
  		"  component: ${TM_FILENAME_BASE/(.stories)//},",
			"};",
			"",
			"export const usage = (props) => {",
			"  <${TM_FILENAME_BASE/(.stories)//}></${TM_FILENAME_BASE/(.stories)//}>",
			"};"
		]
	}
}
```