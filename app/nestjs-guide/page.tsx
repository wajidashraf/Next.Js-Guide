/* ============================================================
   NESTJS BEGINNER GUIDE
   ============================================================
   
   KEY CONCEPTS:
   - NestJS is a Node.js framework for scalable server-side apps
   - Built with TypeScript, inspired by Angular's architecture
   - Uses MVC (Model-View-Controller) pattern
   - Core building blocks: Modules, Controllers, Services
   - Middleware, Pipes, Guards, Interceptors for request lifecycle
   - First-class support for TypeORM, Prisma, Mongoose
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import NestJsSidebar from "./NestJsSidebar";

export const metadata: Metadata = {
  title: "NestJS Guide",
  description:
    "Learn NestJS from scratch — MVC, Services, Middleware, Database, Performance & Debugging.",
};

export default function NestJsGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex gap-10 items-start">
        <NestJsSidebar />
        <div className="flex-1 min-w-0">

      <h1 className="text-4xl font-bold mb-2">🔺 NestJS — Complete Beginner Guide</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Learn how NestJS structures backend apps with MVC, Services, Middleware,
        Databases, and how to optimise &amp; debug them in production.
      </p>

      {/* ════════════════════════════════════════════════════════
         SECTION 1: What is NestJS?
      ════════════════════════════════════════════════════════ */}
      <section id="what-is-nestjs" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">1. What is NestJS?</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          A progressive Node.js framework for building efficient, scalable server-side applications.
        </p>

        <Card title="NestJS at a glance" variant="info">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Built on Node.js</strong> — runs on Express (default) or Fastify under the hood</li>
            <li><strong>Written in TypeScript</strong> — full type safety out of the box</li>
            <li><strong>Angular-inspired architecture</strong> — decorators, modules, dependency injection</li>
            <li><strong>Opinionated structure</strong> — enforces a clear pattern so large teams stay consistent</li>
            <li><strong>Batteries included</strong> — built-in support for validation, auth, WebSockets, GraphQL, microservices</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Install and create a new NestJS project"
            language="bash"
            code={`# Install the NestJS CLI globally
npm install -g @nestjs/cli

# Create a new project
nest new my-api

# Project structure created:
# my-api/
# ├── src/
# │   ├── app.module.ts        ← Root module
# │   ├── app.controller.ts    ← Root controller
# │   ├── app.service.ts       ← Root service
# │   └── main.ts              ← entry point (bootstraps the app)
# ├── test/
# ├── package.json
# └── tsconfig.json

# Start the dev server
cd my-api
npm run start:dev
# → http://localhost:3000`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="main.ts — The entry point"
            code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory creates an instance of your app from the root module
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 2: MVC Pattern
      ════════════════════════════════════════════════════════ */}
      <section id="mvc-pattern" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">2. Model-View-Controller (MVC)</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          The architectural pattern NestJS is built around.
        </p>

        <Card title="MVC separates concerns into 3 layers" variant="info">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 w-24 shrink-0">Model</span>
              <span>Represents your <strong>data structure</strong> &amp; database entities. Defines what a User, Post, or Product looks like.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-green-600 w-24 shrink-0">View</span>
              <span>The <strong>response</strong> sent to the client. In REST APIs, this is typically JSON. In SSR apps, it could be HTML templates.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-purple-600 w-24 shrink-0">Controller</span>
              <span>Handles <strong>incoming requests</strong>, delegates business logic to Services, and returns the response.</span>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="MVC Flow in NestJS"
            language="text"
            code={`Request from client (e.g., GET /users/1)
    │
    ▼
┌─────────────┐
│  Controller  │  → Receives the request, extracts params/body
│  (Route)     │  → Calls the Service
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service    │  → Contains business logic
│  (Logic)     │  → Talks to the database via Repository/Model
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Model      │  → Database entity / schema
│ (TypeORM /   │  → Defines columns, relations, validations
│  Prisma)     │
└──────┬──────┘
       │
       ▼
    Database (PostgreSQL, MySQL, MongoDB, etc.)
       │
       ▼
  JSON Response → sent back through Controller → to Client`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Model — Defining a database entity"
            code={`// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')  // Table name in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })  // Never returned in queries by default
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}

// This entity defines the "users" table:
// | id | name | email | password | createdAt |`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 3: Controllers
      ════════════════════════════════════════════════════════ */}
      <section id="controllers" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">3. Controllers</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Controllers handle incoming HTTP requests and return responses.
        </p>

        <Card title="Controller = Request handler" variant="default">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Decorated with <code>@Controller(&#39;route&#39;)</code></li>
            <li>Methods decorated with <code>@Get()</code>, <code>@Post()</code>, <code>@Put()</code>, <code>@Delete()</code></li>
            <li>Should <strong>NOT</strong> contain business logic — delegate to Services</li>
            <li>Extract request data with <code>@Param()</code>, <code>@Body()</code>, <code>@Query()</code></li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="users.controller.ts — Full CRUD example"
            code={`// src/users/users.controller.ts
import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, HttpCode, HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')  // All routes start with /users
export class UsersController {
  // Inject the service via constructor
  constructor(private readonly usersService: UsersService) {}

  // GET /users?page=1&limit=10
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.usersService.findAll(page, limit);
  }

  // GET /users/5
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // POST /users  (body: { name, email, password })
  @Post()
  @HttpCode(HttpStatus.CREATED)  // Return 201 instead of 200
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT /users/5
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/5
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)  // 204
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="DTOs — Data Transfer Objects (validate input)"
            code={`// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType makes all fields optional — perfect for updates
export class UpdateUserDto extends PartialType(CreateUserDto) {}`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 4: Services
      ════════════════════════════════════════════════════════ */}
      <section id="services" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">4. Services</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Services contain <strong>business logic</strong> and talk to the database.
        </p>

        <Card title="Service = Business logic layer" variant="info">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Decorated with <code>@Injectable()</code> — makes it available for dependency injection</li>
            <li>Injected into Controllers via the constructor</li>
            <li>Contains all logic: validation, database queries, external API calls</li>
            <li>Keep controllers <strong>thin</strong>, services <strong>fat</strong></li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="users.service.ts — Full CRUD service"
            code={`// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Find all users with pagination
  async findAll(page: number, limit: number) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data: users, total, page, limit };
  }

  // Find one user by ID
  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(\`User #\${id} not found\`);
    }
    return user;
  }

  // Create a new user
  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  // Update an existing user
  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);  // Throws if not found
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  // Delete a user
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 5: Modules
      ════════════════════════════════════════════════════════ */}
      <section id="modules" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">5. Modules</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Modules organise your app into feature boundaries.
        </p>

        <Card title="Module = A self-contained feature package" variant="default">
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Every NestJS app has a <strong>root module</strong> (<code>AppModule</code>)</li>
            <li>Each feature gets its own module: <code>UsersModule</code>, <code>PostsModule</code></li>
            <li><code>imports</code> — other modules this module depends on</li>
            <li><code>controllers</code> — route handlers for this feature</li>
            <li><code>providers</code> — services, repositories, and other injectables</li>
            <li><code>exports</code> — providers that other modules can use</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Module structure"
            code={`// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Register entity
  controllers: [UsersController],                // Route handlers
  providers: [UsersService],                     // Business logic
  exports: [UsersService],                       // Share with other modules
})
export class UsersModule {}

// src/app.module.ts — Root module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,  // NEVER true in production!
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Generate a full feature module with the CLI"
            language="bash"
            code={`# Generate a complete module + controller + service + DTOs
nest generate resource users

# This creates:
# src/users/
# ├── users.module.ts
# ├── users.controller.ts
# ├── users.service.ts
# ├── dto/
# │   ├── create-user.dto.ts
# │   └── update-user.dto.ts
# └── entities/
#     └── user.entity.ts`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 6: Middleware
      ════════════════════════════════════════════════════════ */}
      <section id="middleware" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">6. Middleware</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Functions that run <strong>before</strong> the route handler. Used for logging, auth checks, CORS, etc.
        </p>

        <Card title="Request lifecycle in NestJS" variant="warning">
          <p className="text-sm mb-2 font-semibold">The order things run on every request:</p>
          <div className="text-sm font-mono space-y-1">
            <p>1. <strong>Middleware</strong> → runs first (logging, auth)</p>
            <p>2. <strong>Guards</strong> → can the user access this route?</p>
            <p>3. <strong>Interceptors (before)</strong> → transform request</p>
            <p>4. <strong>Pipes</strong> → validate &amp; transform params/body</p>
            <p>5. <strong>Controller method</strong> → handles the request</p>
            <p>6. <strong>Interceptors (after)</strong> → transform response</p>
            <p>7. <strong>Exception filters</strong> → catch errors</p>
          </div>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Creating custom middleware"
            code={`// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // Log after response is finished
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        \`[\${req.method}] \${req.url} → \${res.statusCode} (\${duration}ms)\`
      );
    });

    next();  // Pass to next middleware / handler
  }
}

// Register middleware in the module:
// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({ /* ... */ })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');  // Apply to ALL routes
      // Or: .forRoutes('users')  → only /users routes
      // Or: .forRoutes({ path: 'users', method: RequestMethod.GET })
  }
}`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Common middleware use-cases"
            code={`// Rate limiter middleware
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
      // 100 requests per minute per IP
    }),
  ],
})
export class AppModule {}

// Helmet middleware (security headers)
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());        // Adds security headers
  app.enableCors({          // Configure CORS
    origin: 'https://myapp.com',
    credentials: true,
  });
  await app.listen(3000);
}`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 7: Pipes & Guards
      ════════════════════════════════════════════════════════ */}
      <section id="pipes-guards" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">7. Pipes &amp; Guards</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Pipes validate input. Guards control access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card title="🔧 Pipes — Validate & Transform" variant="info">
            <p className="text-sm">Pipes run <strong>before</strong> the controller method.
            They validate the <code>@Body()</code>, <code>@Param()</code>, or <code>@Query()</code> data
            and throw a 400 error if invalid.</p>
          </Card>
          <Card title="🛡️ Guards — Authorise" variant="warning">
            <p className="text-sm">Guards decide <strong>whether</strong> a request should continue.
            Use them for authentication (is the user logged in?) and authorisation (does the user have permission?).</p>
          </Card>
        </div>

        <div className="mt-4">
          <CodeExample
            title="Global validation pipe (validate all DTOs automatically)"
            code={`// src/main.ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — validates every DTO automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // Strip unknown properties
      forbidNonWhitelisted: true,  // Throw if unknown props sent
      transform: true,         // Auto-convert types (string→number)
    }),
  );

  await app.listen(3000);
}
bootstrap();

// Now any DTO with class-validator decorators is auto-validated:
// POST /users with { name: "", email: "bad" }
// → 400 Bad Request: ["name must be at least 2 characters", ...]`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Auth Guard — Protect routes"
            code={`// src/common/guards/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;  // Attach user to request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

// Use it on a controller or single route:
@Controller('users')
@UseGuards(AuthGuard)       // Protect all routes in this controller
export class UsersController {
  
  @Get('profile')
  @UseGuards(AuthGuard)     // Or protect a single route
  getProfile(@Req() req) {
    return req.user;
  }
}`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 8: Database Setup
      ════════════════════════════════════════════════════════ */}
      <section id="database" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">8. Database Setup</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Everything you need to connect NestJS to a database.
        </p>

        <Card title="Popular ORMs with NestJS" variant="info">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="font-bold">TypeORM</p>
              <p>Most popular with NestJS. Decorator-based. Works with SQL databases.</p>
            </div>
            <div>
              <p className="font-bold">Prisma</p>
              <p>Modern, type-safe. Schema-first approach. Auto-generates types.</p>
            </div>
            <div>
              <p className="font-bold">Mongoose</p>
              <p>For MongoDB. Schema-based. Use <code>@nestjs/mongoose</code>.</p>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="TypeORM Setup — Step by step"
            language="bash"
            code={`# Install TypeORM + PostgreSQL driver
npm install @nestjs/typeorm typeorm pg

# For MySQL:  npm install @nestjs/typeorm typeorm mysql2
# For SQLite: npm install @nestjs/typeorm typeorm better-sqlite3`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Database connection in AppModule"
            code={`// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Load .env file
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
        // synchronize: true  → auto-create tables (dev only!)
        // synchronize: false → use migrations in production
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class AppModule {}`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title=".env — Database credentials"
            language="env"
            code={`# .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=mysecretpassword
DB_NAME=myapp_db
NODE_ENV=development

# NEVER commit .env to Git!
# Add to .gitignore: .env`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Database migrations — Safe schema changes"
            language="bash"
            code={`# Why migrations? 
# synchronize: true auto-modifies tables and CAN DELETE DATA.
# Migrations give you explicit, version-controlled schema changes.

# Generate a migration after changing an entity
npx typeorm migration:generate src/migrations/AddUserRole -d src/data-source.ts

# Run pending migrations
npx typeorm migration:run -d src/data-source.ts

# Revert the last migration
npx typeorm migration:revert -d src/data-source.ts

# Tip: Add these as npm scripts:
# "migration:generate": "typeorm migration:generate -d src/data-source.ts"
# "migration:run": "typeorm migration:run -d src/data-source.ts"`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 9: Database Optimisation
      ════════════════════════════════════════════════════════ */}
      <section id="db-optimisation" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">9. Database Optimisation</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Your database is often the biggest bottleneck. These techniques keep queries fast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card title="📌 Indexes" variant="warning">
            <p className="text-sm">Without indexes, the DB scans <strong>every row</strong> to find matches.
            Add indexes on columns you filter, sort, or join by.</p>
          </Card>
          <Card title="📊 Query Logging" variant="info">
            <p className="text-sm">Turn on <code>logging: true</code> in TypeORM to see every SQL query.
            Watch for N+1 problems (multiple queries when one would do).</p>
          </Card>
        </div>

        <div className="mt-4">
          <CodeExample
            title="Add indexes for faster queries"
            code={`// In your entity — add @Index() to commonly queried columns
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()  // Faster lookups: WHERE user_id = ?
  userId: number;

  @Column()
  @Index()  // Faster sorting: ORDER BY created_at
  createdAt: Date;

  @Column()
  title: string;

  // Composite index — for queries with multiple WHERE conditions
  @Index(['userId', 'createdAt'])  // WHERE user_id = ? AND created_at > ?
  userIdCreatedAt: never;  // virtual column for the decorator
}

// SQL equivalent:
// CREATE INDEX idx_posts_user_id ON posts (user_id);
// CREATE INDEX idx_posts_created ON posts (created_at);`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Fix the N+1 problem with eager/lazy loading"
            code={`// ❌ N+1 PROBLEM — fetches posts, then 1 query PER user
const posts = await postRepo.find();
// SELECT * FROM posts            → 1 query
// SELECT * FROM users WHERE id=1 → N queries (one per post!)
// SELECT * FROM users WHERE id=2
// ...

// ✅ FIX: Join in a single query
const posts = await postRepo.find({
  relations: ['author'],  // LEFT JOIN users
});
// SELECT posts.*, users.* FROM posts LEFT JOIN users → 1 query!

// ✅ FIX: QueryBuilder for complex queries
const posts = await postRepo
  .createQueryBuilder('post')
  .leftJoinAndSelect('post.author', 'author')
  .where('post.published = :pub', { pub: true })
  .orderBy('post.createdAt', 'DESC')
  .take(20)
  .getMany();`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Pagination — Never load all rows at once"
            code={`// Service method with cursor-based pagination (most efficient)
async findAll(cursor?: number, limit = 20) {
  const qb = this.postRepo
    .createQueryBuilder('post')
    .orderBy('post.id', 'DESC')
    .take(limit + 1);  // Fetch one extra to check if there's a next page

  if (cursor) {
    qb.where('post.id < :cursor', { cursor });
  }

  const posts = await qb.getMany();
  const hasNextPage = posts.length > limit;
  if (hasNextPage) posts.pop();  // Remove the extra row

  return {
    data: posts,
    nextCursor: hasNextPage ? posts[posts.length - 1].id : null,
  };
}

// Offset-based pagination (simpler but slower on large tables)
async findAllOffset(page = 1, limit = 20) {
  const [data, total] = await this.postRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { createdAt: 'DESC' },
  });
  return { data, total, page, lastPage: Math.ceil(total / limit) };
}`}
          />
        </div>

        <div className="mt-4">
          <Card title="🗄️ Database optimisation checklist" variant="default">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Index</strong> every column used in WHERE, ORDER BY, JOIN</li>
              <li><strong>Paginate</strong> — never return unbounded result sets</li>
              <li><strong>Select only needed columns</strong> — avoid <code>SELECT *</code></li>
              <li><strong>Use transactions</strong> for multi-step writes</li>
              <li><strong>Connection pooling</strong> — configure <code>extra: {`{ max: 20 }`}</code> in TypeORM</li>
              <li><strong>EXPLAIN ANALYZE</strong> — run in SQL to see query execution plans</li>
              <li><strong>Avoid synchronize: true</strong> in production — use migrations</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 10: Debugging Issues
      ════════════════════════════════════════════════════════ */}
      <section id="debugging" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">10. Debugging &amp; Finding Issues</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Techniques to find and fix problems in your NestJS app.
        </p>

        <Card title="Built-in NestJS Logger" variant="default">
          <p className="text-sm">NestJS includes a Logger class. Use it instead of <code>console.log</code> —
          it&apos;s structured, shows context, and can be swapped for Winston/Pino in production.</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Structured logging"
            code={`// Use NestJS built-in Logger — not console.log!
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async findOne(id: number) {
    this.logger.log(\`Finding user #\${id}\`);
    // [UsersService] Finding user #5

    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      this.logger.warn(\`User #\${id} not found\`);
      // [UsersService] User #5 not found
      throw new NotFoundException();
    }

    return user;
  }
}

// Log levels: logger.log(), logger.warn(), logger.error(), logger.debug()

// Switch to Winston or Pino for production:
// npm install nest-winston winston
// Gives you: JSON logs, log files, log rotation, external services`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Exception filters — Catch and format errors globally"
            code={`// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };

    // Log every error
    this.logger.error(
      \`\${request.method} \${request.url} → \${status}: \${exception.message}\`
    );

    response.status(status).json(errorResponse);
  }
}

// Register globally in main.ts:
// app.useGlobalFilters(new HttpExceptionFilter());`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Debug with VS Code — step through code"
            language="json"
            code={`// .vscode/launch.json — Debug NestJS in VS Code
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug NestJS",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "args": ["src/main.ts"],
      "sourceMaps": true,
      "cwd": "\${workspaceFolder}",
      "env": { "NODE_ENV": "development" }
    }
  ]
}
// Press F5 in VS Code → set breakpoints → step through code`}
          />
        </div>

        <div className="mt-4">
          <Card title="🔍 Common issues and how to find them" variant="warning">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Memory leaks</p>
                <p>Use <code>node --inspect</code> + Chrome DevTools Memory tab. Watch for growing heap over time.</p>
              </div>
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Slow queries</p>
                <p>Enable <code>logging: true</code> in TypeORM. Run <code>EXPLAIN ANALYZE</code> on slow queries.</p>
              </div>
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Unhandled rejections</p>
                <p>Add a global exception filter. Check for missing <code>await</code> on async calls.</p>
              </div>
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Circular dependencies</p>
                <p>NestJS warns you. Fix with <code>forwardRef(() =&gt; Module)</code> or restructure modules.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 11: Performance
      ════════════════════════════════════════════════════════ */}
      <section id="performance" className="mb-14">
        <h2 className="text-2xl font-bold mb-1">11. Performance &amp; Optimisation</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Techniques to make your NestJS API faster and more scalable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card title="⚡ Use Fastify instead of Express" variant="info">
            <p className="text-sm">Fastify handles <strong>~3x more requests/sec</strong> than Express.
            It&apos;s a drop-in replacement — just change one line in <code>main.ts</code>.</p>
          </Card>
          <Card title="🗄️ Caching with Redis" variant="info">
            <p className="text-sm">Cache frequent database queries in Redis.
            NestJS has a built-in <code>@nestjs/cache-manager</code> module.</p>
          </Card>
        </div>

        <div className="mt-4">
          <CodeExample
            title="Switch to Fastify for higher throughput"
            language="bash"
            code={`# Install Fastify adapter
npm install @nestjs/platform-fastify`}
          />
        </div>

        <div className="mt-3">
          <CodeExample
            title="main.ts with Fastify"
            code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
// That's it! Your entire API now runs on Fastify.`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Caching with cache-manager + Redis"
            code={`// Install cache packages
// npm install @nestjs/cache-manager cache-manager cache-manager-redis-yet

// src/app.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: { host: 'localhost', port: 6379 },
          ttl: 60 * 1000,  // Default TTL: 60 seconds
        }),
      }),
    }),
  ],
})
export class AppModule {}

// In your service:
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PostsService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getPopularPosts() {
    // Check cache first
    const cached = await this.cache.get<Post[]>('popular-posts');
    if (cached) return cached;

    // Cache miss → query database
    const posts = await this.postRepo.find({
      order: { likes: 'DESC' },
      take: 10,
    });

    // Store in cache for 5 minutes
    await this.cache.set('popular-posts', posts, 300_000);
    return posts;
  }
}`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Compression & response optimisation"
            code={`// Install compression
// npm install compression @types/compression

// src/main.ts
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Gzip compress all responses (reduces payload 60-80%)
  app.use(compression());

  // Enable shutdown hooks for graceful termination
  app.enableShutdownHooks();

  await app.listen(3000);
}

// Other performance tips in your service layer:
// 1. SELECT only needed columns
const users = await userRepo.find({
  select: ['id', 'name', 'email'],  // Don't fetch password, etc.
});

// 2. Use streams for large datasets
const stream = await userRepo
  .createQueryBuilder('user')
  .stream();  // Doesn't load all rows into memory

// 3. Batch operations
await userRepo
  .createQueryBuilder()
  .insert()
  .into(User)
  .values(batchOfUsers)  // Insert 1000 users in 1 query
  .execute();`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Load testing with autocannon"
            language="bash"
            code={`# Install autocannon (fast HTTP benchmarking tool)
npm install -g autocannon

# Benchmark your API
autocannon -c 100 -d 10 http://localhost:3000/users
# -c 100 = 100 concurrent connections
# -d 10  = run for 10 seconds

# Output:
# Stat     Avg     Stdev   Max
# Req/Sec  12847   1024    14200
# Bytes/Sec 3.2 MB 256 kB  3.6 MB
# 128k requests in 10s

# Compare Express vs Fastify — you'll see ~2-3x difference!

# Other tools:
# wrk           → C-based, very fast
# k6            → JavaScript-based, great for CI/CD
# Artillery     → YAML config, load testing + monitoring`}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
         SECTION 12: Tools & Checklist
      ════════════════════════════════════════════════════════ */}
      <section id="tools-checklist" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">12. Tools &amp; Pre-Launch Checklist</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card title="🧰 Essential NestJS Tools" variant="default">
            <ul className="space-y-2 text-sm">
              {[
                ["Swagger / OpenAPI",  "@nestjs/swagger — auto-generate API docs"],
                ["Compodoc",           "Auto-generate project documentation"],
                ["Jest",               "Built-in testing (unit + e2e)"],
                ["autocannon / k6",    "Load testing / benchmarking"],
                ["TypeORM migrations", "Version-controlled schema changes"],
                ["Docker",             "Containerize app + database"],
                ["PM2",                "Process manager for production"],
                ["Winston / Pino",     "Production-grade structured logging"],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="text-red-600 font-bold shrink-0">•</span>
                  <span><strong>{name}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="📈 Performance Monitoring" variant="info">
            <ul className="space-y-2 text-sm">
              {[
                ["node --inspect",     "Chrome DevTools debugging + profiling"],
                ["clinic.js",          "Node.js performance profiling suite"],
                ["0x",                 "Flamegraph generator for Node.js"],
                ["Prometheus + Grafana", "Metrics dashboard (req/sec, latency, errors)"],
                ["Sentry",             "Error tracking + performance monitoring"],
                ["New Relic / Datadog", "APM (Application Performance Monitoring)"],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span><strong>{name}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="🚀 Performance Checklist" variant="success">
            <ul className="space-y-1 text-sm list-none">
              {[
                "Fastify adapter for higher throughput",
                "Response compression enabled",
                "Redis caching for frequent queries",
                "Database indexes on filtered columns",
                "N+1 queries fixed with JOIN/relations",
                "Pagination on all list endpoints",
                "Connection pooling configured",
                "Load tested with autocannon / k6",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="🔐 Security Checklist" variant="warning">
            <ul className="space-y-1 text-sm list-none">
              {[
                "ValidationPipe globally with whitelist: true",
                "Helmet middleware for security headers",
                "Rate limiting with @nestjs/throttler",
                "CORS configured for allowed origins only",
                "Auth guard on all protected routes",
                "Service-role keys NOT in client code",
                "SQL injection prevented (parameterised queries)",
                "Secrets in .env, not in source code",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="🐛 Debugging Checklist">
            <ul className="space-y-1 text-sm list-none">
              {[
                "NestJS Logger instead of console.log",
                "Global exception filter catches all errors",
                "VS Code debugger configured (launch.json)",
                "TypeORM logging: true in development",
                "EXPLAIN ANALYZE on slow queries",
                "Memory profiling with node --inspect",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="📦 Project Quality">
            <ul className="space-y-1 text-sm list-none">
              {[
                "Feature-based module structure",
                "DTOs for all input validation",
                "Migrations instead of synchronize: true",
                "Swagger docs with @nestjs/swagger",
                "Unit tests for services (Jest)",
                "E2E tests for API endpoints",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

        </div>
      </div>
    </div>
  );
}
