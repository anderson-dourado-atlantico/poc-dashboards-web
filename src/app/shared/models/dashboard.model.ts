export enum DashboardType {
  FOLDER = 'FOLDER',
  ITEM = 'ITEM',
}

export interface DashboardProps {
  id?: string
  folderParentId?: string | null
  type: DashboardType
  name: string
  embeddedLink?: string
  alias?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Dashboard {
  constructor(public props: DashboardProps) {}

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  get embeddedLink() {
    return this.props.embeddedLink
  }

  get folderParentId() {
    return this.props.folderParentId
  }
}
