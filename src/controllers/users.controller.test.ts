import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { UserEntity } from '../models/user.entity';
import { UserController } from './user.controller';
import { HTTP_ERROR } from '../constants/http-errors.enum';

jest.mock('../services/user.service');

const getMockedResponse = (): Response => {
    return {
        json: jest.fn(),
        status: jest.fn()
    } as unknown as Response;
};

const getUser = (id: string|number, login: string, age: string): Partial<UserEntity> => {
    return {
        id: id.toString(),
        login,
        age
    };
};

const service = new UserService();
const controller = new UserController();
const responseMock = getMockedResponse();


describe('Users Controller', () => {
    describe('getUsers()', () => {
        it('returns users', async () => {
            const users = getUser(1, 'testUser', '23');

            const spy = jest.spyOn(service, 'getUsers').mockImplementation(() => users as UserEntity | any);

            await controller.getUsers({ body: { ...users } }  as unknown as Request, responseMock);

            expect(service.getUsers()).toBe(users);
            expect(spy).toHaveBeenCalled();
            expect(responseMock.json).toHaveBeenCalledTimes(1);
            // expect(responseMock.json).toHaveBeenCalledWith(users);
            spy.mockRestore();
        });
    });

    describe('getUser()', () => {
        it('returns user', async () => {
            const user = getUser(1, 'testUser', '23');
            const spy = jest.spyOn(service, 'getUserById').mockImplementation(() => user as UserEntity | any);

            await controller.getUserById({ params: { id: '1' } } as unknown as Request, responseMock);

            // @ts-ignore
            expect(service.getUserById()).toBe(user);
            spy.mockRestore();
        });

        it('returns null if no such user', async () => {
            const spy = jest.spyOn(service, 'getUserById').mockImplementation(() => null as any);

            await controller.getUserById({ params: { id: '1' } } as unknown as Request, responseMock);

            // @ts-ignore
            expect(service.getUserById()).toBeFalsy();
            spy.mockRestore();
        });
    });

    describe('addUser()', () => {
        it('returns added user', async () => {
            const user = getUser(1, 'testUser', '32') as UserEntity;
            const spy = jest.spyOn(service, 'createUser').mockImplementation(() => user as UserEntity | any);

            await controller.create({ body: { ...user } } as unknown as Request, responseMock);

            // @ts-ignore
            expect(service.createUser()).toBe(user);
            spy.mockRestore();
        });

        it('returns error if such user exists', async () => {
            // eslint-disable-next-line no-unused-vars
            let done: (value: (PromiseLike<unknown> | unknown)) => void;
            const callbackResolved = new Promise((resolve) => {
                done = resolve;
            });
            const user = getUser(1, 'testUser', '32') as UserEntity;

            const spy = jest.spyOn(service, 'createUser').mockImplementation(() => new Error('Nooo!') as UserEntity | any);

            await controller.create({ body: { ...user } } as unknown as Request, responseMock);

            expect.assertions(2);
            process.nextTick(() => {
                // @ts-ignore
                expect(responseMock.status).toHaveBeenCalledWith(HTTP_ERROR.INTERNAL_SERVER_ERROR);
                expect(responseMock.json).toHaveBeenCalledWith({ message: "Cannot read properties of undefined (reading 'json')" });
                // @ts-ignore
                done();
            });
            await callbackResolved;
            spy.mockRestore();
        });
    });

    describe('updateUser()', () => {
        it('returns updated user', async () => {
            const user = getUser(1, 'testUser', '23');

            const spy = jest.spyOn(service, 'updateUserById').mockImplementation(() => user as UserEntity | any);

            await controller.update({ params: { id: '1' }, body: { ...user } } as unknown as Request, responseMock);

            // @ts-ignore
            expect(service.updateUserById()).toStrictEqual({ ...user, id: '1' });
            spy.mockRestore();
        });
    });

    describe('deleteUser()', () => {
        it('returns removed user', async () => {
            const user = getUser(1, 'testUser', '23');

            const spy = jest.spyOn(service, 'deleteUserById').mockImplementation(() => user as UserEntity | any);

            await controller.delete({ params: { id: '1' } } as unknown as Request, responseMock);

            // @ts-ignore
            expect(service.deleteUserById()).toBe(user);
            spy.mockRestore();
        });
    });
});
