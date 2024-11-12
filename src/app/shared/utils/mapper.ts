export class Mapper<TFrom, TTo> {
  constructor(private mapFunction: (from: TFrom) => TTo) {}

  map(from: TFrom): TTo {
    return this.mapFunction(from);
  }

  mapArray(fromArray: TFrom[]): TTo[] {
    return fromArray.map(this.mapFunction);
  }

  entityMapper(data) {
    const entityMapper = new Mapper<TFrom, TTo>((entity: TFrom): TTo => {
      return entity as unknown as TTo; // type casting to match the return type
    });
    return entityMapper.map(data);
  }
}