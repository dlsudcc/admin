export class Mapper<TFrom, TTo> {
  constructor(private mapFunction: (from: TFrom) => TTo) {}

  map(from: TFrom): TTo {
    return this.mapFunction(from);
  }

  mapArray(fromArray: TFrom[]): TTo[] {
    return fromArray.map(this.mapFunction);
  }

  entityMapper(data) {
    let entityMapper = new Mapper<any, any>((entity: any): any => {
        return entity;
    })
    return entityMapper.map(data);
  }
}