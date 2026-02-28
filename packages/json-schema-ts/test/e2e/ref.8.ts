const Butler_API_Entities_Project = {
  type: 'object',
  properties: {
    slug: {
      type: 'string'
    },
    owner: {
      type: 'string'
    },
    parent_project: {} as object,
    name: {
      type: 'string',
      description: 'Project Name'
    },
    description: {
      type: 'string',
      description: 'Project Description'
    },
    repository_id: {
      type: 'string',
      description: 'Repository'
    },
    code_repository_id: {
      type: 'string',
      description: 'Code Repository ID'
    },
    created_at: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    }
  },
  description: 'Butler_API_Entities_Project model'
}

Butler_API_Entities_Project.properties.parent_project = Butler_API_Entities_Project

export const input = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    login: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    avatar_url: {
      type: 'string'
    },
    given_name: {
      type: 'string'
    },
    family_name: {
      type: 'string'
    },
    picture: {
      type: 'string'
    },
    locale: {
      type: 'string'
    },
    supporter: {
      type: 'string'
    },
    created_at: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    },
    access_token: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    projects: Butler_API_Entities_Project
  },
  description: 'Butler_API_Entities_UserPrivate model'
}

export const ref = false

export const options = {
  schemaToId: new Map([[Butler_API_Entities_Project, 'project']])
}
