import { camelCase } from 'lodash';
import { Entity } from 'typeorm';

export const CustomEntity = (name: string) => Entity(camelCase(name));
