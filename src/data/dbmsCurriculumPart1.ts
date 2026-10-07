import { Chapter } from '../types/notebook';

export const DBMS_CHAPTERS_PART1: Chapter[] = [
  {
    id: 'dbms-ch1',
    number: 1,
    title: 'DBMS Foundations & Architecture',
    description: 'Limitations of flat file systems, multi-tier schema abstractions, and query engine internals',
    topics: [
      {
        id: 'dbms-files-vs-dbms',
        subjectId: 'dbms',
        chapterId: 'dbms-ch1',
        chapterNumber: 1,
        pageNumber: 1,
        title: 'File Processing Systems vs DBMS',
        difficulty: 'beginner',
        definition: 'A Database Management System (DBMS) is specialized system software designed to store, manage, and retrieve structured data with high concurrency, security, and integrity, eliminating the fundamental flaws of operating system flat files.',
        whyItMatters: 'Flat file systems lead to severe data redundancy, inconsistent copies, lack of atomicity during crashes, and concurrency race conditions in real-world software.',
        syntax: '-- Relational Declarative Query vs Manual File I/O\nSELECT name, salary FROM employees WHERE department_id = 10;',
        explanation: [
          'Data Redundancy & Inconsistency: Flat files replicate customer details across multiple application folders, causing conflicting edits when one file is updated and others are not.',
          'Difficulty in Accessing Data: File systems require custom imperative scripts (e.g. C or Python file read loops) for every ad-hoc filter, whereas DBMS provides declarative SQL.',
          'Atomicity & Crash Recovery: If a power failure occurs midway while saving a file, data is corrupted; DBMS provides transaction logs (WAL) to restore previous valid states.',
          'Concurrent Access Anomalies: Multiple threads writing to the same file cause race conditions and lost updates without DBMS lock managers.'
        ],
        example: {
          language: 'sql',
          code: `-- Traditional File Storage: Manual record scanning and locking\n-- Relational DBMS: Declarative query with transactional safety\nSELECT emp_id, first_name, salary \nFROM enterprise_staff \nWHERE status = 'ACTIVE' AND salary > 75000\nORDER BY salary DESC;`,
          output: `+--------+------------+--------+\n| emp_id | first_name | salary |\n+--------+------------+--------+\n| 1042   | Alex       | 92000  |\n| 1019   | Priya      | 88500  |\n+--------+------------+--------+`,
          annotations: [
            { line: 3, label: 'Declarative projection of specific attributes', type: 'blue' },
            { line: 4, label: 'Table relation reference managed by storage engine', type: 'yellow' },
            { line: 5, label: 'Predicate filter evaluated via index seek', type: 'green' },
            { line: 6, label: 'Server-side ordering buffer', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Evolution: File System vs DBMS Architecture',
          subtitle: 'Centralized Data Management Eliminates Silos',
          elements: [
            { id: '1', label: 'User Application A', sublabel: 'Payroll App', value: 'File A.dat', status: 'warning', arrowTo: '3' },
            { id: '2', label: 'User Application B', sublabel: 'HR App', value: 'File B.dat', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'DBMS Engine', sublabel: 'Unified Catalog', value: 'ACID Controller', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Central Physical Storage', sublabel: 'Shared Database', value: 'Single Source of Truth', status: 'normal' }
          ]
        },
        important: 'In a flat file system, the physical data structure is tightly coupled with application code. In a DBMS, data abstraction guarantees physical data independence.',
        commonMistakes: [
          'Assuming DBMS is just a file wrapper; it incorporates transaction logging, lock management, buffer pools, and cost-based query optimization.',
          'Thinking that file locking in OS provides sufficient transactional ACID guarantees.'
        ],
        tip: 'Whenever an interviewer asks why we use DBMS over files, structure your answer using the 5 core pillars: Redundancy, Integrity, Concurrency, Atomicity, and Security (RICAS).',
        interviewNote: 'Classic GATE/Interview Question: "What are the major disadvantages of file processing systems?" (Expect answers covering Data Isolation, Integrity constraints violation, and Atomicity issues).',
        practiceQuestions: [
          {
            id: 'q-dbms-1-1',
            type: 'mcq',
            question: 'Which of the following is a primary drawback of traditional file processing systems that DBMS directly solves?',
            options: ['High memory requirements', 'Data redundancy and inconsistency', 'Excessive table indexing', 'Strict schema enforcement'],
            correctIndex: 1,
            explanation: 'File systems store duplicate data across different departmental files, causing inconsistency when updates do not sync across files.'
          },
          {
            id: 'q-dbms-1-2',
            type: 'true_false',
            question: 'A flat file system naturally provides ACID transaction guarantees without extra application logic.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation: 'False. File systems lack automated write-ahead logging (WAL), two-phase locking, and crash recovery mechanisms needed for ACID properties.'
          }
        ],
        relatedTopics: ['dbms-3tier-architecture', 'dbms-components']
      },
      {
        id: 'dbms-3tier-architecture',
        subjectId: 'dbms',
        chapterId: 'dbms-ch1',
        chapterNumber: 1,
        pageNumber: 2,
        title: 'Three-Schema (ANSI/SPARC) Architecture & Data Independence',
        difficulty: 'beginner',
        definition: 'The ANSI/SPARC Three-Schema Architecture partitions a database system into three abstraction tiers: External (View) Level, Conceptual (Logical) Level, and Internal (Physical) Level, establishing clean data independence.',
        whyItMatters: 'It isolates end-user views and application logic from physical disk byte representations, allowing DBAs to upgrade hardware or partition disks without breaking frontend applications.',
        syntax: '-- Logical Schema Definition\nCREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50), cgpa DECIMAL(3,2));\n-- External View Definition\nCREATE VIEW student_public AS SELECT id, name FROM students;',
        explanation: [
          'External Level (View Level): Describes user-tailored perspectives of data; masks sensitive attributes (e.g. employee salary hidden from general directory view).',
          'Conceptual Level (Logical Level): Defines what data is stored across the entire enterprise, all entities, relationships, constraints, and business invariants.',
          'Internal Level (Physical Level): Describes how data is physically persisted on block devices (record formats, page clustering, B-Tree indices, hashing, compression).',
          'Logical Data Independence: Capacity to modify the conceptual schema (adding columns/tables) without altering existing external views or application code.',
          'Physical Data Independence: Capacity to modify physical storage schemas (switching from B-Tree to Hash index, changing storage drive) without touching conceptual schemas.'
        ],
        example: {
          language: 'sql',
          code: `-- Conceptual Schema\nCREATE TABLE customer_ledger (\n    customer_id INT PRIMARY KEY,\n    legal_name VARCHAR(100) NOT NULL,\n    account_balance DECIMAL(15, 2) NOT NULL,\n    ssn_tax_id CHAR(9) NOT NULL\n);\n\n-- External Schema (View for Customer Service)\nCREATE VIEW customer_support_view AS\nSELECT customer_id, legal_name \nFROM customer_ledger;`,
          output: 'Query OK, 0 rows affected. View customer_support_view created.',
          annotations: [
            { line: 2, label: 'Conceptual entity defining comprehensive attributes', type: 'blue' },
            { line: 6, label: 'Sensitive attribute masked from public tier', type: 'red' },
            { line: 9, label: 'External view exposing only authorized projections', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'ANSI/SPARC Three-Tier Data Abstraction',
          subtitle: 'Mapping Layers & Data Independence Boundaries',
          elements: [
            { id: '1', label: 'View 1 (App A)', sublabel: 'External Tier', value: 'User Projection', status: 'normal', arrowTo: '3' },
            { id: '2', label: 'View 2 (App B)', sublabel: 'External Tier', value: 'Restricted View', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Conceptual Schema', sublabel: 'Logical Tier', value: 'Entities & Relations', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Internal Schema', sublabel: 'Physical Tier', value: 'B+ Tree & Disk Pages', status: 'referenced' }
          ]
        },
        important: 'Physical data independence is significantly easier to achieve than logical data independence because application programs are heavily reliant on logical column definitions.',
        commonMistakes: [
          'Confusing 3-Tier Application Architecture (Client-Server-DB) with 3-Schema Database Architecture (External-Conceptual-Internal).',
          'Thinking that modifying an existing column data type automatically preserves logical data independence.'
        ],
        tip: 'Mapping happens between layers: External-to-Conceptual mapping handles views, while Conceptual-to-Internal mapping handles disk indexing and data layout.',
        interviewNote: 'Interview Question: "Why is logical data independence harder to achieve than physical data independence?" (Answer: Altering logical schemas often requires altering application queries, whereas physical index tweaks do not change query semantics).',
        practiceQuestions: [
          {
            id: 'q-dbms-1-3',
            type: 'mcq',
            question: 'Modifying the storage structure and access paths without modifying the conceptual schema is known as:',
            options: ['Logical Data Independence', 'Physical Data Independence', 'Schema Evolution', 'Distributed Replication'],
            correctIndex: 1,
            explanation: 'Physical Data Independence allows storage restructuring (such as indexing or disk layout changes) without modifying the logical/conceptual schema.'
          }
        ],
        relatedTopics: ['dbms-files-vs-dbms', 'dbms-components']
      },
      {
        id: 'dbms-components',
        subjectId: 'dbms',
        chapterId: 'dbms-ch1',
        chapterNumber: 1,
        pageNumber: 3,
        title: 'DBMS Components & Query Execution Pipeline',
        difficulty: 'intermediate',
        definition: 'A relational DBMS engine comprises two major sub-systems: the Query Processor (Parser, Optimizer, Execution Engine) and the Storage Engine (Buffer Pool, Transaction Manager, Lock Manager, Recovery Log).',
        whyItMatters: 'Knowing query execution internals helps software engineers write high-performance queries that leverage cost-based optimizers and avoid full table memory thrashing.',
        syntax: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;',
        explanation: [
          'Query Parser & Translator: Validates SQL syntax, verifies table/column names against the data dictionary (system catalog), and converts query to Relational Algebra AST.',
          'Query Optimizer: Evaluates multiple execution plans using database statistics (cardinality, histogram distribution) to choose the cheapest algorithm (Index Scan vs Sequential Scan).',
          'Execution Engine: Executes the compiled plan by requesting data pages from the storage subsystem.',
          'Buffer Manager: Caches disk pages in RAM memory frames using replacement policies (LRU/Clock) to minimize disk I/O bottlenecks.',
          'Transaction & Recovery Manager: Writes log records to disk before modifying actual pages (Write-Ahead Logging protocol) to guarantee durability and rollback.'
        ],
        example: {
          language: 'sql',
          code: `-- Viewing the query execution plan generated by the optimizer\nEXPLAIN \nSELECT e.emp_id, e.name, d.dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nWHERE e.salary > 60000;`,
          output: `-> Hash Join (e.dept_id = d.dept_id) (cost=24.5 rows=120)\n   -> Filter: (e.salary > 60000) (cost=12.2 rows=120)\n      -> Index range scan on employees using idx_salary\n   -> Hash\n      -> Table scan on departments (cost=1.5 rows=10)`,
          annotations: [
            { line: 2, label: 'Declarative SQL input parsed into relational algebra tree', type: 'blue' },
            { line: 5, label: 'Selection predicate pushed down to leaf index level', type: 'green' },
            { line: 4, label: 'Optimized join strategy selected by cost evaluator', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'SQL Query Processing Lifecycle',
          subtitle: 'From Declarative Text to Disk Page Fetch',
          elements: [
            { id: '1', label: 'SQL Query', sublabel: 'Client Input', value: 'SELECT statement', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Parser & Catalog Check', sublabel: 'Syntax & Semantic AST', value: 'Relational Tree', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Query Optimizer', sublabel: 'Cost Evaluation Engine', value: 'Physical Plan', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Execution Engine', sublabel: 'Iterators & Pipeline', value: 'Data Pages', status: 'active', arrowTo: '5' },
            { id: '5', label: 'Buffer Pool / Disk', sublabel: 'Storage Subsystem', value: 'Result Tuples', status: 'referenced' }
          ]
        },
        important: 'The Query Optimizer is the brain of a RDBMS. It transforms declarative SQL ("what data to fetch") into an optimal procedural execution plan ("how to fetch it efficiently").',
        commonMistakes: [
          'Assuming queries execute in the textual order written (SELECT runs before FROM). In reality, FROM and WHERE execute before SELECT.',
          'Overlooking the role of the Buffer Manager; disk I/O is 100,000x slower than RAM access.'
        ],
        tip: 'Always use `EXPLAIN` or `EXPLAIN ANALYZE` on production databases to observe whether your query executes an Index Scan or a costly sequential Table Scan.',
        interviewNote: 'Standard System Design / DB Interview Question: "What is Write-Ahead Logging (WAL) and why does the DBMS write logs before dirtying disk pages?" (Answer: To guarantee atomicity and crash recovery under the ARIES algorithm).',
        practiceQuestions: [
          {
            id: 'q-dbms-1-4',
            type: 'mcq',
            question: 'Which component of the DBMS translates a SQL query into an optimal physical execution plan using database statistics?',
            options: ['Buffer Pool Manager', 'Transaction Logger', 'Query Optimizer', 'DDL Compiler'],
            correctIndex: 2,
            explanation: 'The Query Optimizer generates candidate relational algebra trees and picks the lowest-cost physical plan based on index availability and distribution statistics.'
          }
        ],
        relatedTopics: ['dbms-3tier-architecture', 'dbms-relational-model']
      }
    ]
  },
  {
    id: 'dbms-ch2',
    number: 2,
    title: 'Relational Model & Relational Algebra',
    description: 'Relational formalisms, keys, integrity constraints, and procedural relational algebra queries',
    topics: [
      {
        id: 'dbms-relational-model',
        subjectId: 'dbms',
        chapterId: 'dbms-ch2',
        chapterNumber: 2,
        pageNumber: 4,
        title: 'Relational Model Concepts & Constraints',
        difficulty: 'beginner',
        definition: 'Introduced by E.F. Codd in 1970, the Relational Model represents data as mathematical relations (tables), where each row is a tuple, each column is an attribute, and values are drawn from atomic domains.',
        whyItMatters: 'The relational model provides mathematical foundation, formal semantics, and high declarative abstraction, powering 90% of mission-critical commercial systems today.',
        syntax: 'Relation R(A1: D1, A2: D2, ..., An: Dn)\n-- Degree = Number of attributes (columns)\n-- Cardinality = Number of tuples (rows)',
        explanation: [
          'Domain: Set of all permitted atomic (indivisible) values for an attribute (e.g. age $\\in \\mathbb{Z}^+$).',
          'Degree (Arity): Total number of attributes (columns) in the relation schema.',
          'Cardinality: Total number of tuples (rows) currently stored in the relation instance.',
          'Domain Constraint: Attribute values must be atomic and conform to the specified data type domain.',
          'Entity Integrity Constraint: No primary key attribute component can be NULL; primary keys must uniquely identify every entity.',
          'Referential Integrity Constraint: A foreign key value in child relation R1 must match an existing primary key value in parent relation R2, or be explicitly NULL.'
        ],
        example: {
          language: 'sql',
          code: `-- Enforcing Relational Constraints in Table Schema\nCREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY, -- Entity Integrity (No NULLs)\n    name VARCHAR(50) NOT NULL,\n    dept_id INT,\n    CONSTRAINT fk_dept FOREIGN KEY (dept_id)\n        REFERENCES departments(dept_id) -- Referential Integrity\n);`,
          output: 'Query OK, 0 rows affected. Tables created with constraints.',
          annotations: [
            { line: 2, label: 'Primary key enforces uniqueness & non-nullness', type: 'blue' },
            { line: 8, label: 'Entity integrity constraint enforced on emp_id', type: 'green' },
            { line: 11, label: 'Referential integrity linking child table to parent', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Relational Structure Metrics',
          subtitle: 'Degree (Columns) vs Cardinality (Rows)',
          elements: [
            { id: '1', label: 'Attribute 1 (ID)', sublabel: 'Domain: INT', value: 'Column 1', status: 'active', arrowTo: '4' },
            { id: '2', label: 'Attribute 2 (Name)', sublabel: 'Domain: VARCHAR', value: 'Column 2', status: 'active', arrowTo: '4' },
            { id: '3', label: 'Attribute 3 (Score)', sublabel: 'Domain: FLOAT', value: 'Degree = 3', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Tuple 1: (1, Alice, 95)', sublabel: 'Row 1', value: 'Row Instance', status: 'normal', arrowTo: '5' },
            { id: '5', label: 'Tuple 2: (2, Bob, 88)', sublabel: 'Row 2', value: 'Cardinality = 2', status: 'normal' }
          ]
        },
        important: 'In relational theory, rows have no implicit ordering and duplicate tuples are strictly forbidden in pure mathematical relations.',
        commonMistakes: [
          'Confusing Degree with Cardinality. Degree = Column count; Cardinality = Row count.',
          'Believing that a foreign key must always point to another table; a foreign key can point to the same table (Self-referential FK).'
        ],
        tip: 'To remember easily: "Degree goes across (columns), Cardinality stacks down (rows)".',
        interviewNote: 'High Frequency Question: "Can a Foreign Key column contain NULL values?" (Answer: Yes, unless explicitly constrained with NOT NULL. A NULL foreign key signifies an unassigned relationship).',
        practiceQuestions: [
          {
            id: 'q-dbms-2-1',
            type: 'mcq',
            question: 'If a relation has 5 columns and 100 rows, its Degree and Cardinality are respectively:',
            options: ['100 and 5', '5 and 100', '500 and 5', '5 and 500'],
            correctIndex: 1,
            explanation: 'Degree is the number of attributes (5) and Cardinality is the number of tuples (100).'
          }
        ],
        relatedTopics: ['dbms-keys', 'dbms-relational-algebra']
      },
      {
        id: 'dbms-keys',
        subjectId: 'dbms',
        chapterId: 'dbms-ch2',
        chapterNumber: 2,
        pageNumber: 5,
        title: 'Database Keys: Super, Candidate, Primary & Foreign',
        difficulty: 'intermediate',
        definition: 'Keys are attribute subsets that uniquely distinguish individual tuples within a relation and enforce referential bonds between distinct relations.',
        whyItMatters: 'Choosing correct keys prevents duplicate dirty records, establishes foreign relationships, and determines clustered index layout in production engines.',
        syntax: '-- Key Hierarchy:\nSuper Key ⊇ Candidate Key ⊇ Primary Key',
        explanation: [
          'Super Key (SK): Any set of attributes whose values uniquely identify a tuple. Can contain redundant non-essential attributes (e.g., {Emp_ID, Name, Phone}).',
          'Candidate Key (CK): A minimal Super Key. No proper subset of a Candidate Key is a Super Key. Contains zero redundant attributes.',
          'Primary Key (PK): The specific Candidate Key chosen by the database designer to identify tuples uniquely. Strictly unique and never NULL.',
          'Alternate Key (AK): Candidate keys that were not chosen as the primary key.',
          'Composite Key: A key composed of two or more attributes together.',
          'Foreign Key (FK): An attribute in a table that references the Candidate Key (usually Primary Key) of another table.'
        ],
        example: {
          language: 'sql',
          code: `-- Demonstration of Candidate Keys and Foreign Key\nCREATE TABLE students (\n    roll_no INT,               -- Candidate Key 1\n    email VARCHAR(100),        -- Candidate Key 2\n    phone_no VARCHAR(15),      -- Candidate Key 3\n    full_name VARCHAR(100),\n    PRIMARY KEY (roll_no),     -- Selected Primary Key\n    UNIQUE (email),            -- Alternate Key 1\n    UNIQUE (phone_no)          -- Alternate Key 2\n);`,
          output: 'Query OK, 0 rows affected. Student entity keys registered.',
          annotations: [
            { line: 2, label: 'Candidate key chosen as Primary Key', type: 'blue' },
            { line: 3, label: 'Minimal unique identifier designated as Alternate Key', type: 'green' },
            { line: 6, label: 'Enforces uniqueness & non-nullness on roll_no', type: 'yellow' },
            { line: 7, label: 'Enforces uniqueness on alternate key', type: 'blue' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Database Key Hierarchy Venn Inclusion',
          subtitle: 'Minimality Criterion Distinguishes Candidate Keys',
          elements: [
            { id: '1', label: 'Super Keys (SK)', sublabel: 'All Unique Attribute Sets', value: '{ID}, {ID, Name}, {ID, Email}', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Candidate Keys (CK)', sublabel: 'Minimal Super Keys', value: '{ID}, {Email}', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Primary Key (PK)', sublabel: 'Selected by DBA', value: '{ID}', status: 'referenced' },
            { id: '4', label: 'Alternate Key (AK)', sublabel: 'Remaining Unselected CK', value: '{Email}', status: 'referenced' }
          ]
        },
        important: 'Every Candidate Key is a Super Key, but every Super Key is NOT necessarily a Candidate Key (because a Super Key may contain redundant attributes).',
        commonMistakes: [
          'Assuming a table can have multiple Primary Keys. A table has exactly ONE Primary Key (though it can be a composite key with multiple columns).',
          'Believing Candidate Keys cannot accept NULL; in pure theory, Candidate Keys other than the chosen Primary Key can hold NULL unless restricted.'
        ],
        tip: 'Formula test: If removing any attribute from key K causes it to lose uniqueness, then K is a Candidate Key. If it still retains uniqueness, it is merely a Super Key.',
        interviewNote: 'Common Technical Interview Question: "What is the difference between a Super Key and a Candidate Key?" (Answer: Minimality. Candidate Key is an irreducible minimal Super Key).',
        practiceQuestions: [
          {
            id: 'q-dbms-2-2',
            type: 'mcq',
            question: 'Which of the following statements is strictly correct regarding relational database keys?',
            options: [
              'A relation can have multiple Primary Keys.',
              'Every Candidate Key is a minimal Super Key.',
              'A Super Key cannot contain redundant attributes.',
              'Foreign Keys can never accept NULL values.'
            ],
            correctIndex: 1,
            explanation: 'By formal definition, a Candidate Key is a minimal super key with no extraneous attributes.'
          }
        ],
        relatedTopics: ['dbms-relational-model', 'dbms-normalization-fd']
      },
      {
        id: 'dbms-relational-algebra',
        subjectId: 'dbms',
        chapterId: 'dbms-ch2',
        chapterNumber: 2,
        pageNumber: 6,
        title: 'Relational Algebra: Selection, Projection & Joins',
        difficulty: 'intermediate',
        definition: 'Relational Algebra is a theoretical procedural query language that takes one or more relations as input and produces a new relation as output using mathematical operators.',
        whyItMatters: 'Relational Algebra forms the internal intermediate representation into which SQL queries are parsed before the Query Optimizer generates execution plans.',
        syntax: '-- Selection (Filter Rows): σ_condition(R)\n-- Projection (Filter Columns): π_attr1,attr2(R)\n-- Cartesian Product: R × S\n-- Natural Join: R ⋈ S',
        explanation: [
          'Selection ($\\sigma$): Horizontal slice. Selects tuples that satisfy a given predicate condition. E.g. $\\sigma_{salary > 50000}(Emp)$.',
          'Projection ($\\pi$): Vertical slice. Selects specified attributes and eliminates duplicate tuples in theoretical sets. E.g. $\\pi_{name, dept}(Emp)$.',
          'Cartesian Product ($\\times$): Combines every tuple of relation R with every tuple of S. Degree = Degree(R) + Degree(S); Cardinality = Card(R) × Card(S).',
          'Theta Join ($\\bowtie_\\theta$): Cartesian product followed by a selection condition: $R \\bowtie_\\theta S = \\sigma_\\theta(R \\times S)$.',
          'Natural Join ($\\bowtie$): Performs an equi-join over all shared attributes with identical names and projects out redundant duplicate column names.'
        ],
        example: {
          language: 'sql',
          code: `-- Relational Algebra: π_name, dept_name (σ_salary > 60000 (Emp ⋈ Dept))\n-- Corresponding Declarative SQL:\nSELECT e.name, d.dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nWHERE e.salary > 60000;`,
          output: `+----------+-------------+\n| name     | dept_name   |\n+----------+-------------+\n| Sarah    | Engineering |\n| Leonardo | Research    |\n+----------+-------------+`,
          annotations: [
            { line: 3, label: 'Projection (π) corresponds to SELECT clause', type: 'blue' },
            { line: 4, label: 'Natural/Equi Join (⋈) combines relations', type: 'green' },
            { line: 6, label: 'Selection (σ) corresponds to WHERE predicate', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Relational Algebra Transformation Pipeline',
          subtitle: 'Selection (Horizontal) vs Projection (Vertical)',
          elements: [
            { id: '1', label: 'Relation R (100 Rows, 6 Cols)', sublabel: 'Full Table', value: 'Base Data', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Selection: σ (Salary > 50k)', sublabel: 'Filter Rows', value: '15 Rows, 6 Cols', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Projection: π (Name, Email)', sublabel: 'Filter Columns', value: '15 Rows, 2 Cols', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Final Output Relation', sublabel: 'Minimal Result', value: 'Optimal Memory', status: 'referenced' }
          ]
        },
        important: 'In Relational Algebra, Projection ($\\pi$) eliminates duplicates because relations are mathematical sets. In SQL, `SELECT` preserves duplicates unless `DISTINCT` is specified.',
        commonMistakes: [
          'Confusing Selection (horizontal row filter $\\sigma$) with SQL SELECT (which acts as Projection $\\pi$).',
          'Forgetting that Cartesian product of two relations with $M$ and $N$ rows yields $M \\times N$ rows.'
        ],
        tip: 'Formula reminder: $\\sigma$ = Select rows (Greek "S" for Selection); $\\pi$ = Pick columns (Greek "P" for Projection).',
        interviewNote: 'GATE & Core Exam Favorite: "If relation R has degree 4 and cardinality 20, and S has degree 3 and cardinality 10, what is the degree and cardinality of R × S?" (Answer: Degree = 4+3 = 7; Cardinality = 20×10 = 200).',
        practiceQuestions: [
          {
            id: 'q-dbms-2-3',
            type: 'mcq',
            question: 'The Cartesian Product of relation R (degree 3, cardinality 5) and relation S (degree 2, cardinality 4) has degree and cardinality of:',
            options: ['Degree 5, Cardinality 20', 'Degree 6, Cardinality 9', 'Degree 5, Cardinality 9', 'Degree 6, Cardinality 20'],
            correctIndex: 0,
            explanation: 'Degree = 3 + 2 = 5. Cardinality = 5 * 4 = 20.'
          }
        ],
        relatedTopics: ['dbms-relational-model', 'dbms-sql-joins']
      }
    ]
  },
  {
    id: 'dbms-ch3',
    number: 3,
    title: 'Entity-Relationship (ER) Modeling',
    description: 'Conceptual data modeling, entities, attributes, relationship mappings, and conversion to relational schemas',
    topics: [
      {
        id: 'dbms-er-concepts',
        subjectId: 'dbms',
        chapterId: 'dbms-ch3',
        chapterNumber: 3,
        pageNumber: 7,
        title: 'ER Model: Entities, Attributes & Weak Entities',
        difficulty: 'beginner',
        definition: 'The Entity-Relationship (ER) model is a high-level conceptual data model diagramming real-world entities (objects) and associations (relationships) between them before database implementation.',
        whyItMatters: 'Designing a clear ER diagram prevents redundant tables, missing foreign key links, and costly database redesigns later in production.',
        syntax: '-- Entity represented as Table\n-- Simple Attribute: Name VARCHAR(50)\n-- Composite Attribute: Address (Street, City, Zip)\n-- Multivalued Attribute: Stored as a separate table',
        explanation: [
          'Entity: A distinguishable real-world object (e.g. Student, Course, Order). Represented by a Rectangle.',
          'Attributes: Properties describing an entity. Represented by Ellipses. Types include Simple, Composite (divisible), Single-valued, Multivalued (double ellipse), and Derived (dashed ellipse, e.g. Age computed from DOB).',
          'Weak Entity: An entity that lacks a primary key of its own and depends existence-wise on a strong identifying entity (e.g. Dependent depends on Employee). Represented by a Double Rectangle.',
          'Partial Key (Discriminator): Attribute that distinguishes weak entities belonging to the same strong entity (underlined with a dashed line).'
        ],
        example: {
          language: 'sql',
          code: `-- Converting Strong Entity & Weak Entity into SQL Schema\n-- Strong Parent Entity\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    full_name VARCHAR(100) NOT NULL\n);\n\n-- Weak Dependent Entity\n-- PK is composite: (emp_id + dep_name)\nCREATE TABLE employee_dependents (\n    emp_id INT,\n    dep_name VARCHAR(50), -- Discriminator / Partial Key\n    relationship VARCHAR(30),\n    PRIMARY KEY (emp_id, dep_name),\n    FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE\n);`,
          output: 'Query OK, 0 rows affected. Weak entity table with composite PK created.',
          annotations: [
            { line: 2, label: 'Strong entity with independent primary key', type: 'blue' },
            { line: 10, label: 'Partial key (discriminator) of weak entity', type: 'yellow' },
            { line: 12, label: 'Composite primary key combines strong PK and discriminator', type: 'green' },
            { line: 13, label: 'Cascading deletion preserves existence dependency', type: 'red' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'ER Structural Notations & Symbols',
          subtitle: 'Standard Chen Notation Representation',
          elements: [
            { id: '1', label: 'Strong Entity', sublabel: 'Single Rectangle', value: '[Employee]', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Weak Entity', sublabel: 'Double Rectangle', value: '[[Dependent]]', status: 'warning', arrowTo: '3' },
            { id: '3', label: 'Relationship', sublabel: 'Diamond Symbol', value: '<Has_Dependent>', status: 'normal', arrowTo: '4' },
            { id: '4', label: 'Derived Attribute', sublabel: 'Dashed Ellipse', value: '((Age from DOB))', status: 'referenced' }
          ]
        },
        important: 'A weak entity always has total participation in its identifying relationship and its primary key is formed by combining the identifying entity primary key with its own partial discriminator.',
        commonMistakes: [
          'Attempting to store multivalued attributes (e.g. multiple phone numbers) directly in a single column without normalization or a child table.',
          'Confusing a weak entity with an entity that simply has a foreign key.'
        ],
        tip: 'In Chen notation: Key attribute is underlined solid; Partial discriminator of a weak entity is underlined with a dashed line.',
        interviewNote: 'Standard Interview Question: "How is a Multivalued Attribute mapped into a relational schema?" (Answer: A multivalued attribute requires creating a separate table containing the attribute itself plus the primary key of the parent entity as a foreign key).',
        practiceQuestions: [
          {
            id: 'q-dbms-3-1',
            type: 'mcq',
            question: 'In an ER diagram, a Weak Entity is represented graphically by a:',
            options: ['Dashed Oval', 'Double Rectangle', 'Double Diamond', 'Inverted Triangle'],
            correctIndex: 1,
            explanation: 'Weak entities are symbolized with double-bordered rectangles, and their identifying relationships use double-bordered diamonds.'
          }
        ],
        relatedTopics: ['dbms-er-cardinality', 'dbms-er-to-relational']
      },
      {
        id: 'dbms-er-cardinality',
        subjectId: 'dbms',
        chapterId: 'dbms-ch3',
        chapterNumber: 3,
        pageNumber: 8,
        title: 'Cardinality Ratios & Participation Constraints',
        difficulty: 'intermediate',
        definition: 'Cardinality Ratios (1:1, 1:N, M:N) specify how many instances of an entity can be associated with instances of another entity, while Participation Constraints (Total vs Partial) define whether entity existence strictly depends on the relationship.',
        whyItMatters: 'Cardinality directly dictates where foreign keys must be placed during schema conversion to avoid redundant NULL values or extra junction tables.',
        syntax: '-- 1:1 Relationship: Foreign key on either side (prefer total participation side)\n-- 1:N Relationship: Foreign key strictly on the "Many" side table\n-- M:N Relationship: Separate junction table with composite PK',
        explanation: [
          'One-to-One (1:1): E.g. Citizen has one Passport. The foreign key can go into either table, but placing it on the side with Total Participation eliminates NULLs.',
          'One-to-Many (1:N): E.g. Department has many Employees. The foreign key MUST be placed inside the "Many" entity table (Employees table contains `dept_id`).',
          'Many-to-Many (M:N): E.g. Students enroll in Courses. Cannot be represented by a single foreign key without repeating rows; requires a separate Junction (Bridge) table.',
          'Total Participation: Every entity in the set must participate in the relationship (represented by a Double Line). E.g. Every employee must belong to a department.',
          'Partial Participation: Some entities in the set may not participate (represented by a Single Line). E.g. Not every employee manages a department.'
        ],
        example: {
          language: 'sql',
          code: `-- M:N Relationship converted into a Junction Table\nCREATE TABLE students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\n\nCREATE TABLE courses (\n    course_id VARCHAR(10) PRIMARY KEY,\n    title VARCHAR(100)\n);\n\n-- Junction Table representing the M:N "Enrolls" Relationship\nCREATE TABLE student_courses (\n    student_id INT,\n    course_id VARCHAR(10),\n    enroll_date DATE DEFAULT (CURRENT_DATE),\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES students(student_id),\n    FOREIGN KEY (course_id) REFERENCES courses(course_id)\n);`,
          output: 'Query OK, 0 rows affected. Bridge table for M:N mapping created.',
          annotations: [
            { line: 2, label: 'Entity 1 with primary key', type: 'blue' },
            { line: 7, label: 'Entity 2 with primary key', type: 'blue' },
            { line: 12, label: 'Composite primary key formed from both foreign keys', type: 'green' },
            { line: 16, label: 'Foreign keys link junction table back to parent entities', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Mapping 1:N vs M:N Relationships',
          subtitle: 'Where Foreign Keys Reside in Relational Design',
          elements: [
            { id: '1', label: 'Department [1]', sublabel: 'Parent Entity', value: 'dept_id (PK)', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Employee [N]', sublabel: 'Foreign Key Placed Here', value: 'emp_id (PK) + dept_id (FK)', status: 'active' },
            { id: '3', label: 'Student [M]', sublabel: 'Entity A', value: 'student_id (PK)', status: 'normal', arrowTo: '5' },
            { id: '4', label: 'Course [N]', sublabel: 'Entity B', value: 'course_id (PK)', status: 'normal', arrowTo: '5' },
            { id: '5', label: 'Enrollment [Junction]', sublabel: 'Bridge Table', value: '(student_id, course_id) PK', status: 'referenced' }
          ]
        },
        important: 'In a 1:N relationship, NEVER place the foreign key on the 1-side, because a department would need an array of employee IDs, which violates First Normal Form (1NF).',
        commonMistakes: [
          'Creating an unnecessary junction table for a 1:N relationship when simply placing a foreign key on the N-side is sufficient and more optimal.',
          'Missing the composite primary key on junction tables, allowing duplicate duplicate enrollments for the same student and course.'
        ],
        tip: 'Golden Rule of Schema Design: "Foreign key always follows the Many (N) side". For M:N, create a new table.',
        interviewNote: 'Standard System Design Question: "What is the minimum number of tables needed to represent a Many-to-Many relationship between two entities?" (Answer: 3 tables — Entity 1, Entity 2, and the Junction Table).',
        practiceQuestions: [
          {
            id: 'q-dbms-3-2',
            type: 'mcq',
            question: 'To represent a Many-to-Many (M:N) relationship between two entities in a relational database, how many total tables are minimally required?',
            options: ['1 table', '2 tables', '3 tables', '4 tables'],
            correctIndex: 2,
            explanation: 'Two tables for the individual entities plus one junction (associative) table to store pairs of foreign keys.'
          }
        ],
        relatedTopics: ['dbms-er-concepts', 'dbms-er-to-relational']
      }
    ]
  },
  {
    id: 'dbms-ch4',
    number: 4,
    title: 'SQL Fundamentals (DDL, DML & Integrity)',
    description: 'Data Definition Language, Data Manipulation Language, column constraints, and CRUD commands',
    topics: [
      {
        id: 'dbms-sql-ddl',
        subjectId: 'dbms',
        chapterId: 'dbms-ch4',
        chapterNumber: 4,
        pageNumber: 9,
        title: 'SQL DDL: CREATE, ALTER, DROP & TRUNCATE',
        difficulty: 'beginner',
        definition: 'Data Definition Language (DDL) encompasses SQL commands that define, alter, and manage the database schema catalog structure rather than the actual data instances.',
        whyItMatters: 'DDL operations modify table layouts and indices. Understanding differences between DROP, TRUNCATE, and DELETE prevents catastrophic data loss in production environments.',
        syntax: 'CREATE TABLE table_name (...);\nALTER TABLE table_name ADD column_name data_type;\nTRUNCATE TABLE table_name;\nDROP TABLE table_name;',
        explanation: [
          'CREATE: Creates new databases, tables, views, or indexes in the catalog.',
          'ALTER: Modifies an existing table schema (adds columns, drops constraints, modifies data types) without losing existing data.',
          'DROP: Completely removes the table structure, metadata, and all stored rows permanently from the database dictionary.',
          'TRUNCATE: Deallocates all data storage pages used by the table; rows are deleted instantly without logging individual row deletions, but the empty table structure remains intact.',
          'DELETE (DML comparison): Removes rows one-by-one with full transaction rollback logging; supports WHERE filtering.'
        ],
        example: {
          language: 'sql',
          code: `-- DDL Schema Definition & Modifications\nCREATE TABLE product_catalog (\n    product_id INT PRIMARY KEY AUTO_INCREMENT,\n    sku_code VARCHAR(30) UNIQUE NOT NULL,\n    price DECIMAL(10,2) CHECK (price >= 0.00),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Altering schema to add a category column\nALTER TABLE product_catalog \nADD COLUMN stock_qty INT NOT NULL DEFAULT 0;\n\n-- Rapid truncation of all rows\nTRUNCATE TABLE product_catalog;`,
          output: 'Query OK, 0 rows affected. DDL schema commands executed.',
          annotations: [
            { line: 2, label: 'Defines surrogate primary key with auto-increment', type: 'blue' },
            { line: 4, label: 'Enforces business validation via CHECK constraint', type: 'green' },
            { line: 10, label: 'Alters table schema by appending new column with default', type: 'yellow' },
            { line: 13, label: 'Fast page deallocation; resets auto-increment counter', type: 'red' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'DROP vs TRUNCATE vs DELETE Comparison',
          subtitle: 'Speed, Logging, and Schema Retention',
          elements: [
            { id: '1', label: 'DELETE FROM table', sublabel: 'DML Command', value: 'Row-by-Row Logged (Slow, Can Rollback)', status: 'normal' },
            { id: '2', label: 'TRUNCATE TABLE', sublabel: 'DDL Command', value: 'Page Dealloc (Fast, Schema Preserved)', status: 'active' },
            { id: '3', label: 'DROP TABLE', sublabel: 'DDL Command', value: 'Structure & Data Destroyed Permanently', status: 'warning' }
          ]
        },
        important: 'DDL commands (like `TRUNCATE` and `DROP`) automatically perform an implicit COMMIT in MySQL/Oracle, meaning you cannot roll them back in standard default transaction modes.',
        commonMistakes: [
          'Trying to use a `WHERE` clause with `TRUNCATE`. TRUNCATE deallocates the entire table; to filter deleted rows, you must use `DELETE FROM table WHERE ...`.',
          'Confusing TRUNCATE (which resets auto-increment IDs) with DELETE (which retains the auto-increment cursor).'
        ],
        tip: 'Mnemonic: "DELETE is like erasing pencil marks one-by-one; TRUNCATE rips out the whole written page but leaves the empty notebook; DROP throws the notebook into the fire."',
        interviewNote: 'Top 5 Most Asked Interview Question: "What are the key differences between DROP, TRUNCATE, and DELETE?" (Focus on DDL vs DML, speed, WHERE clause support, and rollback logging).',
        practiceQuestions: [
          {
            id: 'q-dbms-4-1',
            type: 'mcq',
            question: 'Which SQL command deallocates all data storage pages of a table instantly while keeping the empty table structure intact?',
            options: ['DROP TABLE', 'DELETE FROM', 'TRUNCATE TABLE', 'REMOVE TABLE'],
            correctIndex: 2,
            explanation: 'TRUNCATE TABLE is a DDL command that deallocates data pages rapidly while keeping the schema structure.'
          }
        ],
        relatedTopics: ['dbms-sql-dml', 'dbms-sql-constraints']
      },
      {
        id: 'dbms-sql-dml',
        subjectId: 'dbms',
        chapterId: 'dbms-ch4',
        chapterNumber: 4,
        pageNumber: 10,
        title: 'SQL DML: INSERT, UPDATE, DELETE & Filtering',
        difficulty: 'beginner',
        definition: 'Data Manipulation Language (DML) consists of statements that query, insert, modify, and remove data instances within existing database relations.',
        whyItMatters: 'DML operations form 99% of daily database interactions in backend REST APIs and microservice endpoints.',
        syntax: 'INSERT INTO table (col1, col2) VALUES (val1, val2);\nUPDATE table SET col1 = val1 WHERE condition;\nDELETE FROM table WHERE condition;\nSELECT col1, col2 FROM table WHERE condition;',
        explanation: [
          'INSERT: Appends new row tuples into the relation. Supports bulk multi-row inserts for optimal network batching.',
          'UPDATE: Modifies existing column values in matching rows. Always pair with a WHERE clause to prevent accidental bulk table updates.',
          'DELETE: Removes specific rows matching a predicate. Always test predicate with SELECT first.',
          'WHERE Predicate Operators: Comparison (`=`, `!=`, `<`, `>`), Logical (`AND`, `OR`, `NOT`), Range (`BETWEEN`), Set membership (`IN`), Pattern matching (`LIKE \'%val%\'`), and Null checks (`IS NULL`).'
        ],
        example: {
          language: 'sql',
          code: `-- Multi-row insert with batch optimization\nINSERT INTO user_profiles (username, email, loyalty_tier, points)\nVALUES \n    ('coder_zen', 'zen@example.com', 'GOLD', 1250),\n    ('tech_guru', 'guru@example.com', 'SILVER', 450);\n\n-- Conditional update with arithmetic modifier\nUPDATE user_profiles \nSET points = points + 100, loyalty_tier = 'PLATINUM'\nWHERE username = 'coder_zen' AND points >= 1200;\n\n-- Targeted row deletion\nDELETE FROM user_profiles \nWHERE points = 0 AND created_at < NOW() - INTERVAL 1 YEAR;`,
          output: 'Query OK, 2 rows inserted. 1 row updated. 0 rows deleted.',
          annotations: [
            { line: 2, label: 'Explicit column specification prevents drift bugs', type: 'blue' },
            { line: 3, label: 'Single multi-tuple insert statement minimizes network round-trips', type: 'green' },
            { line: 9, label: 'Atomic column transformation using current column value', type: 'yellow' },
            { line: 14, label: 'Precise compound predicate avoids accidental table wipe', type: 'red' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'DML Execution with Safe Rollback Path',
          subtitle: 'Transactional Safety During Data Modification',
          elements: [
            { id: '1', label: 'BEGIN TRANSACTION', sublabel: 'Savepoint Initialized', value: 'Dirty Read Barrier', status: 'active', arrowTo: '2' },
            { id: '2', label: 'UPDATE / DELETE', sublabel: 'Row Locks Acquired', value: 'Write to WAL Log', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Verify Row Count', sublabel: 'Rows Affected Check', value: 'Rows > Expected?', status: 'warning', arrowTo: '4' },
            { id: '4', label: 'COMMIT or ROLLBACK', sublabel: 'Permanent Save or Revert', value: 'Safety Guaranteed', status: 'referenced' }
          ]
        },
        important: 'In SQL, `NULL = NULL` evaluates to UNKNOWN (not TRUE) due to Three-Valued Logic (3VL). Always use `IS NULL` or `IS NOT NULL` to test for null values.',
        commonMistakes: [
          'Writing `WHERE col = NULL` instead of `WHERE col IS NULL`. The former never matches any row.',
          'Executing `UPDATE` or `DELETE` without a `WHERE` clause in production terminals.'
        ],
        tip: 'Pro Developer Rule: Always run `SELECT COUNT(*) FROM table WHERE condition;` before executing `DELETE FROM table WHERE condition;` to verify exactly which rows will be affected.',
        interviewNote: 'Standard Interview Question: "Why does `SELECT * FROM table WHERE col = NULL;` return empty results even if rows have NULL in `col`?" (Answer: SQL uses Three-Valued Logic: NULL is an unknown marker, not a value. Comparing anything with NULL yields UNKNOWN, which WHERE treats as False).',
        practiceQuestions: [
          {
            id: 'q-dbms-4-2',
            type: 'mcq',
            question: 'What is the boolean evaluation result of the expression `NULL = NULL` in SQL standard three-valued logic?',
            options: ['TRUE', 'FALSE', 'UNKNOWN', 'ERROR'],
            correctIndex: 2,
            explanation: 'SQL uses 3VL (True, False, Unknown). Comparing NULL with any value or another NULL evaluates to UNKNOWN.'
          }
        ],
        relatedTopics: ['dbms-sql-ddl', 'dbms-sql-joins']
      }
    ]
  },
  {
    id: 'dbms-ch5',
    number: 5,
    title: 'Advanced SQL & Analytical Queries',
    description: 'GROUP BY, HAVING, subqueries, Correlated subqueries, Common Table Expressions (CTE), and Window Functions',
    topics: [
      {
        id: 'dbms-sql-aggregations',
        subjectId: 'dbms',
        chapterId: 'dbms-ch5',
        chapterNumber: 5,
        pageNumber: 11,
        title: 'Grouping & Aggregations: GROUP BY vs HAVING',
        difficulty: 'intermediate',
        definition: 'Aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) compute a single summary value over sets of tuples. `GROUP BY` partitions rows into buckets, and `HAVING` filters aggregated buckets.',
        whyItMatters: 'Mastering SQL logical query processing order prevents grouping syntax bugs and powers business metric dashboards and analytics engines.',
        syntax: 'SELECT col, AGG(col2) FROM table WHERE filter GROUP BY col HAVING agg_filter;',
        explanation: [
          'Logical Query Processing Order: 1. `FROM` -> 2. `WHERE` (filters individual rows) -> 3. `GROUP BY` (groups rows) -> 4. `HAVING` (filters grouped buckets) -> 5. `SELECT` -> 6. `ORDER BY` -> 7. `LIMIT`.',
          '`WHERE` vs `HAVING`: `WHERE` filters rows BEFORE aggregation occurs and cannot reference aggregate functions. `HAVING` filters group summaries AFTER aggregation.',
          '`COUNT(*)` vs `COUNT(column)`: `COUNT(*)` counts all matching rows including NULLs; `COUNT(column)` counts only rows where the specified column is NOT NULL.'
        ],
        example: {
          language: 'sql',
          code: `-- Departmental salary expenditure analysis\nSELECT \n    department_id,\n    COUNT(*) AS total_employees,\n    ROUND(AVG(salary), 2) AS average_salary,\n    MAX(salary) AS top_salary\nFROM staff_members\nWHERE employment_status = 'ACTIVE' -- Pre-aggregation filter\nGROUP BY department_id\nHAVING COUNT(*) >= 5 AND AVG(salary) > 65000 -- Post-aggregation filter\nORDER BY average_salary DESC;`,
          output: `+---------------+-----------------+----------------+------------+\n| department_id | total_employees | average_salary | top_salary |\n+---------------+-----------------+----------------+------------+\n| 4             | 12              | 84200.50       | 135000     |\n| 2             | 8               | 71500.00       | 98000      |\n+---------------+-----------------+----------------+------------+`,
          annotations: [
            { line: 2, label: 'Grouping attribute included in SELECT projection', type: 'blue' },
            { line: 7, label: 'WHERE executes first on individual row records', type: 'green' },
            { line: 8, label: 'Partitions remaining rows into department buckets', type: 'yellow' },
            { line: 9, label: 'HAVING filters out small or low-paying department groups', type: 'red' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'SQL Logical Processing Execution Hierarchy',
          subtitle: 'The Strict Order in Which the SQL Engine Evaluates Clauses',
          elements: [
            { id: '1', label: '1. FROM & JOIN', sublabel: 'Data Source', value: 'Generate Virtual Table', status: 'normal', arrowTo: '2' },
            { id: '2', label: '2. WHERE', sublabel: 'Row Filtering', value: 'Discard Non-matching Rows', status: 'active', arrowTo: '3' },
            { id: '3', label: '3. GROUP BY', sublabel: 'Bucket Partitioning', value: 'Aggregate Values', status: 'active', arrowTo: '4' },
            { id: '4', label: '4. HAVING', sublabel: 'Group Filtering', value: 'Discard Non-matching Groups', status: 'active', arrowTo: '5' },
            { id: '5', label: '5. SELECT & ORDER', sublabel: 'Projection & Sort', value: 'Final Output Client Response', status: 'referenced' }
          ]
        },
        important: 'Any column appearing in the `SELECT` list that is NOT enclosed inside an aggregate function MUST be explicitly declared in the `GROUP BY` clause.',
        commonMistakes: [
          'Using aggregate functions in the `WHERE` clause (e.g. `WHERE AVG(salary) > 50000`). This causes a syntax error; use `HAVING AVG(salary) > 50000`.',
          'Assuming `COUNT(col)` counts NULLs. It ignores NULLs completely.'
        ],
        tip: 'Whenever writing complex analytical queries, mentally trace the query using the "FWGHSO" mnemonic: From, Where, Group by, Having, Select, Order by.',
        interviewNote: 'Classic Technical Interview Question: "Can HAVING be used without GROUP BY in a SQL query?" (Answer: Yes! When HAVING is used without GROUP BY, the entire table is treated as a single group).',
        practiceQuestions: [
          {
            id: 'q-dbms-5-1',
            type: 'mcq',
            question: 'Which of the following clauses is executed by the SQL query engine immediately before the SELECT clause?',
            options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
            correctIndex: 1,
            explanation: 'In logical query processing order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. HAVING executes immediately before SELECT.'
          }
        ],
        relatedTopics: ['dbms-sql-dml', 'dbms-sql-window-functions']
      },
      {
        id: 'dbms-sql-window-functions',
        subjectId: 'dbms',
        chapterId: 'dbms-ch5',
        chapterNumber: 5,
        pageNumber: 12,
        title: 'Subqueries, CTEs & Window Functions',
        difficulty: 'advanced',
        definition: 'Window functions perform calculations across a set of table rows related to the current row without collapsing the individual rows into a single summary like `GROUP BY` does.',
        whyItMatters: 'Window functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`) and Common Table Expressions (`WITH`) are required for solving top-N ranking, running totals, and leetcode SQL interview challenges.',
        syntax: 'SELECT col, RANK() OVER (PARTITION BY category ORDER BY score DESC) FROM table;\nWITH cte_name AS (SELECT ...) SELECT * FROM cte_name;',
        explanation: [
          'Subquery: A query nested inside another query (e.g. inside `WHERE`, `FROM`, or `SELECT`).',
          'Correlated Subquery: A subquery that references columns from the outer query; it executes once for every single candidate row evaluated by the outer query.',
          'Common Table Expression (CTE): Defined via the `WITH` clause; creates a temporary named result set readable like a table within that query, dramatically improving readability.',
          '`ROW_NUMBER()`: Assigns a unique sequential integer to rows starting at 1 with no ties.',
          '`RANK()`: Assigns identical rank numbers to ties, skipping the subsequent ranks (e.g. 1, 2, 2, 4).',
          '`DENSE_RANK()`: Assigns identical rank numbers to ties without skipping subsequent ranks (e.g. 1, 2, 2, 3).'
        ],
        example: {
          language: 'sql',
          code: `-- Finding the 2nd Highest Salary in each Department using CTE & DENSE_RANK\nWITH RankedSalaries AS (\n    SELECT \n        emp_id,\n        full_name,\n        dept_id,\n        salary,\n        DENSE_RANK() OVER (\n            PARTITION BY dept_id \n            ORDER BY salary DESC\n        ) AS salary_rank\n    FROM employees\n)\nSELECT emp_id, full_name, dept_id, salary\nFROM RankedSalaries\nWHERE salary_rank = 2;`,
          output: `+--------+-----------+---------+--------+\n| emp_id | full_name | dept_id | salary |\n+--------+-----------+---------+--------+\n| 104    | Elena     | 1       | 92000  |\n| 118    | Raj       | 2       | 86000  |\n+--------+-----------+---------+--------+`,
          annotations: [
            { line: 2, label: 'CTE creates clean modular intermediate relation', type: 'blue' },
            { line: 7, label: 'DENSE_RANK ensures no skipped numbers in tied rankings', type: 'green' },
            { line: 8, label: 'PARTITION BY resets rank counter per department bucket', type: 'yellow' },
            { line: 15, label: 'Outer query simply filters by target rank', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Ranking Behavior on Tied Values [100, 90, 90, 80]',
          subtitle: 'ROW_NUMBER vs RANK vs DENSE_RANK Comparison',
          elements: [
            { id: '1', label: 'ROW_NUMBER()', sublabel: 'Strict Unique Sequence', value: '1, 2, 3, 4', status: 'normal' },
            { id: '2', label: 'RANK()', sublabel: 'Ties Share, Skips Next', value: '1, 2, 2, 4', status: 'warning' },
            { id: '3', label: 'DENSE_RANK()', sublabel: 'Ties Share, No Skipping', value: '1, 2, 2, 3', status: 'active' }
          ]
        },
        important: 'Correlated subqueries can have a time complexity of O(N × M) because the inner query runs repeatedly for every row. CTEs and Window functions are usually heavily optimized by modern database engines.',
        commonMistakes: [
          'Using `RANK()` instead of `DENSE_RANK()` when searching for the "N-th highest salary". If there is a tie for 1st place, `RANK()` skips rank 2 entirely.',
          'Trying to use a window function in the `WHERE` clause directly. Window functions evaluate after WHERE; you must wrap them in a subquery or CTE first.'
        ],
        tip: 'Whenever asked for "2nd highest salary" or "top N items per category" in an interview, immediately use `DENSE_RANK() OVER (PARTITION BY ... ORDER BY ... DESC)` inside a CTE.',
        interviewNote: '#1 Most Popular SQL Interview Question in Tech: "Write a SQL query to find the 2nd highest salary of an employee." (DENSE_RANK inside a CTE is the gold standard solution).',
        practiceQuestions: [
          {
            id: 'q-dbms-5-2',
            type: 'mcq',
            question: 'If salaries are [100k, 90k, 90k, 75k], what rank will DENSE_RANK() assign to the salary of 75k?',
            options: ['Rank 4', 'Rank 3', 'Rank 2', 'Rank 5'],
            correctIndex: 1,
            explanation: 'DENSE_RANK assigns 1 to 100k, 2 to both 90k values, and does not skip ranks, giving 3 to 75k.'
          }
        ],
        relatedTopics: ['dbms-sql-aggregations', 'dbms-sql-joins']
      }
    ]
  }
];
