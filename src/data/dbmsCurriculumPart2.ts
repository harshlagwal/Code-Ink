import { Chapter } from '../types/notebook';

export const DBMS_CHAPTERS_PART2: Chapter[] = [
  {
    id: 'dbms-ch6',
    number: 6,
    title: 'SQL Joins & Set Operations',
    description: 'Relational combinations: Inner, Outer, Cross, Self Joins, and mathematical Set operations',
    topics: [
      {
        id: 'dbms-sql-joins',
        subjectId: 'dbms',
        chapterId: 'dbms-ch6',
        chapterNumber: 6,
        pageNumber: 13,
        title: 'SQL Joins: Inner, Left, Right & Full Outer',
        difficulty: 'intermediate',
        definition: 'A JOIN clause combines fields from two or more tables based on a related column common between them. INNER JOIN retains matching rows; OUTER JOIN preserves non-matching rows by padding missing columns with NULL.',
        whyItMatters: 'Relational normalization separates concerns into distinct tables. Joins reconstruct the unified business picture across normalized entities during query time.',
        syntax: 'SELECT * FROM A INNER JOIN B ON A.id = B.a_id;\nSELECT * FROM A LEFT JOIN B ON A.id = B.a_id;\nSELECT * FROM A FULL OUTER JOIN B ON A.id = B.a_id;',
        explanation: [
          'INNER JOIN: Returns only tuples that have matching values in both tables on the join predicate condition.',
          'LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table. If no match exists on the right, NULLs are returned for right-side columns.',
          'RIGHT (OUTER) JOIN: Returns all records from the right table, and matched records from the left table.',
          'FULL (OUTER) JOIN: Returns all rows when there is a match in either left or right table. Unmatched attributes on either side are filled with NULLs.',
          'CROSS JOIN: Produces the Cartesian product of two tables ($N \\times M$ rows) without any ON condition.'
        ],
        example: {
          language: 'sql',
          code: `-- Fetching ALL customers, including those who have placed ZERO orders (LEFT JOIN)\nSELECT \n    c.customer_id,\n    c.customer_name,\n    o.order_id,\n    COALESCE(o.total_amount, 0.00) AS order_total\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nORDER BY c.customer_id;`,
          output: `+-------------+---------------+----------+-------------+\n| customer_id | customer_name | order_id | order_total |\n+-------------+---------------+----------+-------------+\n| 1           | Acme Corp     | 901      | 4500.00     |\n| 1           | Acme Corp     | 905      | 1200.00     |\n| 2           | Globex Ind    | NULL     | 0.00        |\n+-------------+---------------+----------+-------------+`,
          annotations: [
            { line: 6, label: 'Preserves all rows from master customer relation', type: 'blue' },
            { line: 7, label: 'Secondary relation padded with NULL when no order exists', type: 'yellow' },
            { line: 5, label: 'COALESCE converts NULL padding into zero for presentation', type: 'green' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Venn Logic of SQL Joins',
          subtitle: 'Row Inclusion Criteria Across Relations',
          elements: [
            { id: '1', label: 'INNER JOIN', sublabel: 'Intersection (A ∩ B)', value: 'Matched Pairs Only', status: 'active' },
            { id: '2', label: 'LEFT JOIN', sublabel: 'All A + Matched B', value: 'Preserves Left Side', status: 'normal' },
            { id: '3', label: 'RIGHT JOIN', sublabel: 'All B + Matched A', value: 'Preserves Right Side', status: 'normal' },
            { id: '4', label: 'FULL OUTER JOIN', sublabel: 'Union (A ∪ B)', value: 'Includes All Unmatched', status: 'warning' }
          ]
        },
        important: 'In a LEFT JOIN, putting a filter in the `ON` clause vs the `WHERE` clause produces completely different results. Filters in `ON` apply before joining, whereas filters in `WHERE` apply after joining and can turn a LEFT JOIN into an INNER JOIN.',
        commonMistakes: [
          'Writing `WHERE o.status = \'PAID\'` on a LEFT JOIN table. If a customer has no orders, `o.status` is NULL, so the WHERE filter discards that customer, converting it into an INNER JOIN.',
          'Forgetting that MySQL does not have a native `FULL OUTER JOIN` keyword; it is simulated using `LEFT JOIN UNION RIGHT JOIN`.'
        ],
        tip: 'To find records in Table A that do NOT exist in Table B, use: `FROM A LEFT JOIN B ON A.id = B.a_id WHERE B.a_id IS NULL`. This is the Anti-Join pattern.',
        interviewNote: 'Common Interview Trick Question: "How do you find all customers who never made a purchase?" (Answer: Use a LEFT JOIN and filter with `WHERE orders.customer_id IS NULL`, or use `NOT EXISTS`).',
        practiceQuestions: [
          {
            id: 'q-dbms-6-1',
            type: 'mcq',
            question: 'Which join type returns all records from Table A, along with matched records from Table B, filling missing Table B columns with NULL?',
            options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'],
            correctIndex: 1,
            explanation: 'LEFT OUTER JOIN preserves every tuple from the left relation, padding right-side attributes with NULL when no match satisfies the ON predicate.'
          }
        ],
        relatedTopics: ['dbms-sql-self-join', 'dbms-relational-algebra']
      },
      {
        id: 'dbms-sql-self-join',
        subjectId: 'dbms',
        chapterId: 'dbms-ch6',
        chapterNumber: 6,
        pageNumber: 14,
        title: 'Self Joins & SQL Set Operations',
        difficulty: 'intermediate',
        definition: 'A SELF JOIN is a regular join in which a table is joined with itself using table aliases. SQL Set Operations (`UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`) combine result sets vertically.',
        whyItMatters: 'Self joins solve hierarchical tree structures (like employee-to-manager or category-to-parent hierarchies) within a single normalized database table.',
        syntax: 'SELECT e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;\nSELECT col FROM A UNION [ALL] SELECT col FROM B;',
        explanation: [
          'Self Join: Table joined to itself by providing distinct aliases (e.g. `employees e` for the subordinate and `employees m` for the supervisor).',
          '`UNION` vs `UNION ALL`: `UNION` merges result sets and executes an expensive sorting step to eliminate duplicate rows. `UNION ALL` retains all duplicates and runs much faster.',
          '`INTERSECT`: Returns only rows common to both query result sets.',
          '`EXCEPT` / `MINUS`: Returns rows from the first query that are not present in the second query.',
          'Set Compatibility Rule: For set operations to work, both queries must project the exact same number of columns with compatible data types.'
        ],
        example: {
          language: 'sql',
          code: `-- Finding each employee and their direct manager using SELF JOIN\nSELECT \n    e.emp_name AS employee,\n    COALESCE(m.emp_name, 'Top Executive (No Manager)') AS manager\nFROM staff e\nLEFT JOIN staff m ON e.manager_id = m.emp_id\nORDER BY e.emp_name;`,
          output: `+----------------+------------------------------+\n| employee       | manager                      |\n+----------------+------------------------------+\n| Alice Smith    | Bob Johnson                  |\n| Bob Johnson    | Top Executive (No Manager)   |\n| Carlos Ray     | Bob Johnson                  |\n+----------------+------------------------------+`,
          annotations: [
            { line: 4, label: 'Table alias "e" represents the subordinate employee', type: 'blue' },
            { line: 5, label: 'Table alias "m" represents the manager instance', type: 'yellow' },
            { line: 5, label: 'Self-referencing foreign key linked to primary key', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Self-Referential Tree Traversal via Self Join',
          subtitle: 'Staff Table Alias Mapping Hierarchy',
          elements: [
            { id: '1', label: 'Bob Johnson [ID: 101]', sublabel: 'Manager Instance (Alias m)', value: 'manager_id: NULL', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Alice Smith [ID: 102]', sublabel: 'Subordinate (Alias e)', value: 'manager_id: 101', status: 'normal' },
            { id: '3', label: 'Carlos Ray [ID: 103]', sublabel: 'Subordinate (Alias e)', value: 'manager_id: 101', status: 'normal' }
          ]
        },
        important: 'Always prefer `UNION ALL` over `UNION` in performance-critical queries unless you strictly need deduplication, because `UNION` triggers an expensive disk/memory sort.',
        commonMistakes: [
          'Using an `INNER JOIN` for a self join employee-manager hierarchy. The CEO has `manager_id = NULL`, so an INNER JOIN will accidentally omit the CEO from the report.',
          'Combining queries with different column counts in a UNION, which causes a compile-time schema mismatch error.'
        ],
        tip: 'Whenever building graph, category tree, or org-chart queries in SQL, reach for SELF JOIN or recursive CTEs (`WITH RECURSIVE`).',
        interviewNote: 'High Frequency Question: "What is the computational performance difference between UNION and UNION ALL?" (Answer: UNION ALL has O(N) complexity since it simply concatenates buffers, while UNION has O(N log N) complexity due to sorting and deduplication).',
        practiceQuestions: [
          {
            id: 'q-dbms-6-2',
            type: 'mcq',
            question: 'Which SQL set operator combines two queries and includes duplicate rows without performing an expensive deduplication sort?',
            options: ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'],
            correctIndex: 1,
            explanation: 'UNION ALL directly concatenates result sets without discarding duplicate tuples or invoking a sort pass.'
          }
        ],
        relatedTopics: ['dbms-sql-joins', 'dbms-sql-window-functions']
      }
    ]
  },
  {
    id: 'dbms-ch7',
    number: 7,
    title: 'Database Normalization & Functional Dependencies',
    description: 'Functional dependencies, attribute closure, Armstrong axioms, 1NF, 2NF, 3NF, BCNF, and lossless decomposition',
    topics: [
      {
        id: 'dbms-normalization-fd',
        subjectId: 'dbms',
        chapterId: 'dbms-ch7',
        chapterNumber: 7,
        pageNumber: 15,
        title: 'Functional Dependencies & Attribute Closure',
        difficulty: 'intermediate',
        definition: 'A Functional Dependency (FD) $X \\rightarrow Y$ is an integrity constraint between two sets of attributes in relation R such that if two tuples agree on values of $X$, they must also agree on values of $Y$. Attribute Closure $X^+$ is the set of all attributes functionally determined by $X$.',
        whyItMatters: 'Computing attribute closures is the fundamental mathematical technique used to discover candidate keys and test normal form compliance in relational schema design.',
        syntax: '-- Functional Dependency Notation: Determinant -> Dependent\n-- Attribute Closure: X+ = Set of all attributes derivable from X using FDs',
        explanation: [
          'Trivial FD: $X \\rightarrow Y$ is trivial if $Y \\subseteq X$ (e.g. $\\{A, B\\} \\rightarrow A$). Always holds true.',
          'Non-Trivial FD: $X \\rightarrow Y$ is non-trivial if $Y \\not\\subseteq X$ (e.g. $Emp\\_ID \\rightarrow Salary$).',
          'Armstrong\'s Axioms: Sound and complete inference rules: Reflexivity ($Y \\subseteq X \\implies X \\rightarrow Y$), Augmentation ($X \\rightarrow Y \\implies XZ \\rightarrow YZ$), and Transitivity ($X \\rightarrow Y \\land Y \\rightarrow Z \\implies X \\rightarrow Z$).',
          'Secondary Rules: Union ($X \\rightarrow Y \\land X \\rightarrow Z \\implies X \\rightarrow YZ$), Decomposition ($X \\rightarrow YZ \\implies X \\rightarrow Y \\land X \\rightarrow Z$).',
          'Candidate Key Test: If the closure $(X)^+$ contains every single attribute of relation $R$, and no proper subset of $X$ does, then $X$ is a Candidate Key.'
        ],
        example: {
          language: 'sql',
          code: `-- Algorithm to find Candidate Keys of Relation R(A, B, C, D)\n-- Given FDs: F = { A -> B, B -> C, C -> D }\n-- Step 1: Compute (A)+\n-- (A)+ = {A} -> {A, B} -> {A, B, C} -> {A, B, C, D} (All attributes!)\n-- Since A derives all attributes and is minimal, A is a Candidate Key!\n\n-- Relational table reflecting this dependency:\nCREATE TABLE employee_license (\n    ssn CHAR(9) PRIMARY KEY,     -- A: Determines all below\n    emp_name VARCHAR(50),        -- B: Dependent on A\n    dept_code VARCHAR(10),       -- C: Dependent on B\n    building_id VARCHAR(10)      -- D: Dependent on C\n);`,
          output: 'Closure calculation verified: (A)+ = {A, B, C, D}. Candidate Key = {A}.',
          annotations: [
            { line: 2, label: 'Given functional dependency set F', type: 'blue' },
            { line: 3, label: 'Stepwise closure expansion via Transitivity', type: 'green' },
            { line: 8, label: 'Minimal determinant becomes table primary key', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Attribute Closure Expansion: (A)+ -> {A, B, C, D}',
          subtitle: 'Iterative Attribute Derivation via FDs',
          elements: [
            { id: '1', label: 'Initial Set: {A}', sublabel: 'Base Attribute', value: 'Seed Closure', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Apply A -> B', sublabel: 'Add B', value: '{A, B}', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Apply B -> C', sublabel: 'Add C', value: '{A, B, C}', status: 'active', arrowTo: '4' },
            { id: '4', label: 'Apply C -> D', sublabel: 'Add D', value: '{A, B, C, D}', status: 'referenced' }
          ]
        },
        important: 'If an attribute never appears on the right-hand side of any FD in set F, it MUST be an essential part of every candidate key of the relation.',
        commonMistakes: [
          'Confusing Decomposition rule with Composition. If $A \\rightarrow BC$, then $A \\rightarrow B$ and $A \\rightarrow C$ (Valid). But if $AB \\rightarrow C$, you CANNOT decompose it to $A \\rightarrow C$ (Invalid!).',
          'Stopping closure expansion early before all transitive FDs have been applied.'
        ],
        tip: 'Trick for GATE/Exams: Inspect RHS of all FDs. Any attribute absent from the RHS cannot be derived by anything else, so it must be included in your starting candidate key guess.',
        interviewNote: 'Standard GATE Question: "Given R(A, B, C, D, E) with F = {AB -> C, C -> D, D -> E}, find the Candidate Keys." (Answer: AB is the only Candidate Key because AB is never on the RHS).',
        practiceQuestions: [
          {
            id: 'q-dbms-7-1',
            type: 'mcq',
            question: 'For relation R(A, B, C) with FDs {A -> B, B -> C}, which attribute set constitutes the Candidate Key?',
            options: ['{B}', '{C}', '{A}', '{B, C}'],
            correctIndex: 2,
            explanation: 'The closure (A)+ = {A, B, C}, covering all attributes of R. Therefore, {A} is the minimal Candidate Key.'
          }
        ],
        relatedTopics: ['dbms-keys', 'dbms-normalization-forms']
      },
      {
        id: 'dbms-normalization-forms',
        subjectId: 'dbms',
        chapterId: 'dbms-ch7',
        chapterNumber: 7,
        pageNumber: 16,
        title: 'Normal Forms: 1NF, 2NF, 3NF & BCNF',
        difficulty: 'advanced',
        definition: 'Normalization is the systematic process of decomposing relations to minimize data redundancy and eliminate update, insertion, and deletion anomalies while preserving dependencies and lossless joins.',
        whyItMatters: 'Unnormalized databases cause catastrophic anomalies: deleting a student accidentally deletes a course, or updating an address requires modifying 10,000 duplicate rows.',
        syntax: '-- 1NF: Atomic values only (no repeating groups)\n-- 2NF: 1NF + No Partial Dependency (Non-prime attribute dependent on part of composite key)\n-- 3NF: 2NF + No Transitive Dependency (X -> Y: X is SuperKey OR Y is Prime Attribute)\n-- BCNF: For every non-trivial FD X -> Y, X must strictly be a Super Key',
        explanation: [
          '1NF (First Normal Form): Every attribute domain contains only atomic (indivisible) values; no multi-valued attributes or nested arrays.',
          '2NF (Second Normal Form): Relation must be in 1NF and have NO Partial Dependencies. Every non-prime attribute must be fully functionally dependent on the whole candidate key (applies only to composite keys).',
          '3NF (Third Normal Form): Relation must be in 2NF and have NO Transitive Dependencies. For every non-trivial FD $X \\rightarrow Y$, either $X$ is a Super Key OR $Y$ is a Prime Attribute (part of a candidate key).',
          'BCNF (Boyce-Codd Normal Form): A stricter version of 3NF. For every non-trivial FD $X \\rightarrow Y$, $X$ must strictly be a Super Key (no exception for prime attributes!).',
          'Anomalies Removed: Insertion Anomaly (cannot insert course without student), Deletion Anomaly (deleting student deletes course), Update Anomaly (updating course fee in 100 rows).'
        ],
        example: {
          language: 'sql',
          code: `-- Normalizing an Unnormalized Table into 3NF Schema\n-- BAD DESIGN (Update Anomaly & Redundancy):\n-- orders(order_id, customer_id, customer_name, customer_city, total)\n\n-- 3NF Normalized Design (Decomposed):\nCREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    customer_name VARCHAR(100) NOT NULL,\n    customer_city VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT NOT NULL,\n    order_total DECIMAL(10,2) NOT NULL,\n    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n);`,
          output: 'Query OK, 0 rows affected. Normalized tables eliminate transitive customer redundancy.',
          annotations: [
            { line: 5, label: 'Dedicated customer entity; customer details stored once', type: 'blue' },
            { line: 11, label: 'Orders table contains only order attributes and foreign key', type: 'green' },
            { line: 14, label: 'Lossless relationship preserved via referential foreign key', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'Normalization Hierarchy & Dependency Filters',
          subtitle: 'Progressive Elimination of Relational Anomalies',
          elements: [
            { id: '1', label: '1NF: Atomic Domains', sublabel: 'Remove Multivalued Arrays', value: 'Scalar Values', status: 'normal', arrowTo: '2' },
            { id: '2', label: '2NF: Full Functional Dependency', sublabel: 'Remove Partial Dependencies', value: 'Composite Key Fix', status: 'normal', arrowTo: '3' },
            { id: '3', label: '3NF: Remove Transitive FDs', sublabel: 'X is SuperKey OR Y is Prime', value: 'Enterprise Standard', status: 'active', arrowTo: '4' },
            { id: '4', label: 'BCNF: Strict SuperKey Rule', sublabel: 'X Must Be SuperKey for All FDs', value: 'Strict Anomaly-Free', status: 'referenced' }
          ]
        },
        important: '3NF always guarantees both Lossless Join decomposition and Dependency Preservation. BCNF guarantees Lossless Join, but may NOT always preserve all functional dependencies.',
        commonMistakes: [
          'Checking for 2NF violations in a table whose candidate key consists of a single attribute. If the candidate key is single-column, partial dependency is mathematically impossible, so 1NF implies 2NF immediately!',
          'Thinking BCNF is always strictly better in practice. If BCNF loses a functional dependency, DBAs often intentionally prefer 3NF to avoid expensive multi-table join assertions.'
        ],
        tip: 'Fast Exam Checklist: 1. Single-column PK? Skip 2NF check (it is already 2NF). 2. Non-key column determining another non-key column? Violates 3NF! 3. Prime attribute on RHS of non-super-key LHS? 3NF valid, but violates BCNF.',
        interviewNote: 'Top Core Interview Question: "What is the difference between 3NF and BCNF, and why isn\'t every 3NF relation in BCNF?" (Answer: In 3NF, $X \\rightarrow Y$ is permitted if $Y$ is a prime attribute even if $X$ is not a super key. BCNF strictly eliminates this exception).',
        practiceQuestions: [
          {
            id: 'q-dbms-7-2',
            type: 'mcq',
            question: 'If every candidate key of relation R consists of a single attribute, and R is in 1NF, what is the highest normal form guaranteed without further checks?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctIndex: 1,
            explanation: 'Partial dependency requires a proper subset of a candidate key. If all candidate keys are single attributes, no proper subset can exist, so it is automatically in 2NF.'
          }
        ],
        relatedTopics: ['dbms-normalization-fd', 'dbms-keys']
      }
    ]
  },
  {
    id: 'dbms-ch8',
    number: 8,
    title: 'Transaction Management & ACID Properties',
    description: 'Transaction states, ACID guarantees, concurrent schedules, and conflict serializability testing',
    topics: [
      {
        id: 'dbms-acid-transactions',
        subjectId: 'dbms',
        chapterId: 'dbms-ch8',
        chapterNumber: 8,
        pageNumber: 17,
        title: 'Transaction States & The ACID Properties',
        difficulty: 'intermediate',
        definition: 'A Transaction is a single logical unit of database work comprising one or more SQL operations. To ensure database integrity, every transaction must adhere to the ACID properties: Atomicity, Consistency, Isolation, and Durability.',
        whyItMatters: 'Transactions prevent data corruption during bank transfers, ticket bookings, and system crashes where partial updates could create or destroy money.',
        syntax: 'BEGIN TRANSACTION;\n-- Operations\nCOMMIT; -- On Success\nROLLBACK; -- On Error/Abort',
        explanation: [
          'Atomicity (All-or-Nothing): Either all operations of the transaction complete successfully and reflect in the DB, or none do. Managed by the Recovery Manager using logs.',
          'Consistency (Correctness): A transaction must transform the database from one valid consistent state satisfying all integrity constraints (primary keys, foreign keys, balances >= 0) to another valid state.',
          'Isolation (Independence): The intermediate execution state of a transaction is concealed from all other concurrent transactions. Managed by Concurrency Control (locks/MVCC).',
          'Durability (Permanence): Once a transaction commits, its modifications persist permanently in non-volatile storage even in the event of an immediate power outage or OS crash. Guaranteed by Write-Ahead Logging (WAL).',
          'Transaction State Machine: Active -> Partially Committed -> Committed; Active -> Failed -> Aborted (Rolled back).'
        ],
        example: {
          language: 'sql',
          code: `-- Atomic Bank Fund Transfer ($500 from Account 101 to Account 202)\nSTART TRANSACTION;\n\nUPDATE bank_accounts \nSET balance = balance - 500.00 \nWHERE account_id = 101 AND balance >= 500.00;\n\n-- Simulating safety check: verify 1 row was updated\nUPDATE bank_accounts \nSET balance = balance + 500.00 \nWHERE account_id = 202;\n\n-- If all operations succeed without error:\nCOMMIT;`,
          output: 'Query OK, 2 rows affected. Transaction committed durably.',
          annotations: [
            { line: 2, label: 'Initializes transaction boundary in Active state', type: 'blue' },
            { line: 4, label: 'Debit sender: row-level lock acquired', type: 'yellow' },
            { line: 9, label: 'Credit receiver: ledger consistency preserved', type: 'yellow' },
            { line: 13, label: 'Writes commit log to WAL; transitions to Committed state', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Transaction Finite State Machine (FSM)',
          subtitle: 'Lifecycle Transitions from Active to Terminated',
          elements: [
            { id: '1', label: 'Active', sublabel: 'Initial State', value: 'Executing Ops', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Partially Committed', sublabel: 'Last Op Executed', value: 'Pending WAL Flush', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Committed', sublabel: 'Durable on Disk', value: 'Permanent Success', status: 'referenced' },
            { id: '4', label: 'Failed', sublabel: 'Error or Crash', value: 'Aborting', status: 'warning', arrowTo: '5' },
            { id: '5', label: 'Aborted', sublabel: 'Rolled Back', value: 'DB Restored to Initial', status: 'normal' }
          ]
        },
        important: 'A transaction is in the "Partially Committed" state after its final statement has executed, but BEFORE the commit record is flushed to persistent storage disk.',
        commonMistakes: [
          'Confusing Atomicity with Isolation. Atomicity handles crashes within a single transaction; Isolation handles conflicts between concurrent multiple transactions.',
          'Assuming Consistency is handled entirely by the DBMS. Application developers must also enforce business logic (e.g. transfer amounts cannot be negative).'
        ],
        tip: 'Map DBMS sub-systems to ACID: A -> Recovery Manager; C -> Application & Schema Constraints; I -> Concurrency Control Manager; D -> Storage Engine WAL Log.',
        interviewNote: 'Most Asked Concept in Database Systems: "What happens if the system crashes when a transaction is in the Partially Committed state?" (Answer: The transaction transitions to the Failed state and must be Rolled Back to ensure Atomicity, because commit records were not yet fully persisted to disk).',
        practiceQuestions: [
          {
            id: 'q-dbms-8-1',
            type: 'mcq',
            question: 'Which ACID property guarantees that once a transaction commits, its modifications are permanently recorded and survive system crashes?',
            options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
            correctIndex: 3,
            explanation: 'Durability ensures that committed transaction updates remain permanent even in the face of power loss or system crashes.'
          }
        ],
        relatedTopics: ['dbms-serializability', 'dbms-concurrency-control']
      },
      {
        id: 'dbms-serializability',
        subjectId: 'dbms',
        chapterId: 'dbms-ch8',
        chapterNumber: 8,
        pageNumber: 18,
        title: 'Schedules & Conflict Serializability',
        difficulty: 'advanced',
        definition: 'A Schedule is a chronological sequence of execution operations across concurrent transactions. A schedule is Conflict Serializable if it is conflict equivalent to some serial schedule (where transactions run one after another without interleaving).',
        whyItMatters: 'Conflict serializability is the mathematical gold standard ensuring concurrent transactions execute without corrupting database integrity.',
        syntax: '-- Conflicting Operations Condition:\n-- 1. Belong to different transactions\n-- 2. Access the same data item Q\n-- 3. At least one of them is a WRITE (W(Q))\n-- Conflict Pairs: (R1, W2), (W1, R2), (W1, W2)',
        explanation: [
          'Serial Schedule: No interleaving of operations. One transaction finishes completely before the next begins. Always consistent but poor CPU utilization.',
          'Non-Serial Schedule: Operations of multiple transactions interleave concurrently to maximize CPU and I/O parallelism.',
          'Conflicting Operations: Two operations conflict if and only if they belong to different transactions, access the exact same data item, and at least one is a Write operation.',
          'Precedence Graph (Serialization Graph): Directed graph $G = (V, E)$ where vertices are transactions ($T_i$) and directed edges $T_i \\rightarrow T_j$ represent a conflicting operation where $T_i$ accessed data item $X$ before $T_j$.',
          'Testing Theorem: A schedule $S$ is Conflict Serializable IF AND ONLY IF its Precedence Graph contains NO CYCLES (is a Directed Acyclic Graph - DAG).'
        ],
        example: {
          language: 'sql',
          code: `-- Schedule S with two transactions T1 and T2 on item A:\n-- T1: Read(A) -> Write(A)\n-- T2:            Read(A) -> Write(A)\n\n-- Precedence Graph Analysis:\n-- 1. R1(A) before W2(A) => Directed Edge: T1 -> T2\n-- 2. W1(A) before R2(A) => Directed Edge: T1 -> T2 (Consistent)\n-- 3. W1(A) before W2(A) => Directed Edge: T1 -> T2 (Consistent)\n-- Graph has NO cycle! Topological order is: T1 -> T2.\n-- Therefore, Schedule S is Conflict Serializable!`,
          output: 'Precedence graph is acyclic. Schedule is conflict equivalent to serial schedule <T1, T2>.',
          annotations: [
            { line: 5, label: 'Conflicting operation pair detected on shared resource A', type: 'blue' },
            { line: 9, label: 'Cycle-free directed graph proves conflict serializability', type: 'green' }
          ]
        },
        diagram: {
          type: 'flow',
          title: 'Conflict Precedence Graph Testing',
          subtitle: 'Cycle Detection Determines Serializability',
          elements: [
            { id: '1', label: 'Transaction T1', sublabel: 'Holds Item X', value: 'W1(X)', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Transaction T2', sublabel: 'Waits for Item X', value: 'R2(X)', status: 'normal', arrowTo: '3' },
            { id: '3', label: 'Transaction T3', sublabel: 'Final Writer', value: 'W3(X)', status: 'referenced' }
          ]
        },
        important: 'View Serializability is a broader concept that includes blind writes, but testing for View Serializability is NP-Complete. Hence, commercial DBMS engines enforce Conflict Serializability via locking protocols.',
        commonMistakes: [
          'Treating two concurrent READ operations ($R_1(A)$ and $R_2(A)$) as conflicting. Read-Read never conflicts because reading does not modify data state.',
          'Confusing a cyclic graph with a serializable schedule. If a precedence graph has a cycle (e.g. $T_1 \\rightarrow T_2 \\rightarrow T_1$), it is strictly NOT conflict serializable.'
        ],
        tip: 'To find the serial equivalent order of an acyclic precedence graph, perform a Topological Sort on the graph nodes.',
        interviewNote: 'Standard GATE / Tech Question: "How many conflicting pairs can exist between two transactions accessing item X?" (Answer: Three pairs: Read-Write, Write-Read, and Write-Write. Read-Read is non-conflicting).',
        practiceQuestions: [
          {
            id: 'q-dbms-8-2',
            type: 'mcq',
            question: 'A concurrent schedule S is guaranteed to be Conflict Serializable if its Precedence Graph:',
            options: ['Contains at least one cycle', 'Is an undirected tree', 'Contains NO cycles (is acyclic)', 'Has fewer than 3 vertices'],
            correctIndex: 2,
            explanation: 'According to the Serializability Theorem, a schedule is conflict serializable if and only if its precedence graph contains no directed cycles.'
          }
        ],
        relatedTopics: ['dbms-acid-transactions', 'dbms-concurrency-control']
      }
    ]
  },
  {
    id: 'dbms-ch9',
    number: 9,
    title: 'Concurrency Control & Deadlocks',
    description: 'Concurrency anomalies, Two-Phase Locking (2PL), Strict 2PL, and Deadlock detection algorithms',
    topics: [
      {
        id: 'dbms-concurrency-control',
        subjectId: 'dbms',
        chapterId: 'dbms-ch9',
        chapterNumber: 9,
        pageNumber: 19,
        title: 'Concurrency Anomalies & Isolation Levels',
        difficulty: 'intermediate',
        definition: 'Without adequate concurrency controls, interleaved transactions suffer from four classical concurrency anomalies: Dirty Read, Non-Repeatable Read, Phantom Read, and Lost Update. ANSI SQL defines four Isolation Levels to control them.',
        whyItMatters: 'Selecting the correct transaction isolation level balances query throughput against data anomalies in high-traffic payment and booking engines.',
        syntax: 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n-- Isolation Levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE',
        explanation: [
          'Dirty Read (G0/G1): $T_2$ reads uncommitted data written by $T_1$. If $T_1$ subsequently aborts/rolls back, $T_2$ has acted upon phantom garbage data.',
          'Non-Repeatable Read: $T_1$ reads a row. $T_2$ updates or deletes that row and commits. When $T_1$ reads the same row again, it sees modified values.',
          'Phantom Read: $T_1$ executes a range query (e.g. `WHERE age > 30`). $T_2$ inserts a new row matching that range and commits. When $T_1$ re-runs the range query, a new "phantom" row appears.',
          'Lost Update: Two transactions read the same initial value and write updates concurrently; one update overwrites and obliterates the other without including its changes.',
          'ANSI Isolation Levels: Read Uncommitted (allows dirty reads), Read Committed (default in Postgres/Oracle), Repeatable Read (default in MySQL InnoDB), Serializable (strict serial order via range locks).'
        ],
        example: {
          language: 'sql',
          code: `-- Demonstrating Isolation Level Configuration in SQL\n-- Preventing Dirty Reads and Non-Repeatable Reads\nSET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE account_id = 50; -- Value: 1000\n\n-- Even if another transaction commits an update to account 50 right now,\n-- MVCC snapshot isolation guarantees we read 1000 again:\nSELECT balance FROM accounts WHERE account_id = 50; -- Guaranteed 1000\nCOMMIT;`,
          output: 'Query OK, isolation level set. Snapshot consistency preserved.',
          annotations: [
            { line: 3, label: 'Sets Repeatable Read isolation level for current session', type: 'blue' },
            { line: 6, label: 'Consistent read view snapshot established on first SELECT', type: 'green' },
            { line: 10, label: 'Subsequent reads return identical consistent snapshot', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'ANSI SQL Isolation Levels vs Anomalies Prevented',
          subtitle: 'Higher Isolation = Higher Safety, Lower Concurrency',
          elements: [
            { id: '1', label: 'Read Uncommitted', sublabel: 'Lowest Safety', value: 'Allows Dirty Reads', status: 'warning' },
            { id: '2', label: 'Read Committed', sublabel: 'Default in Postgres', value: 'Prevents Dirty Reads', status: 'normal' },
            { id: '3', label: 'Repeatable Read', sublabel: 'Default in MySQL', value: 'Prevents Non-Repeatable', status: 'active' },
            { id: '4', label: 'Serializable', sublabel: 'Highest Safety', value: 'Prevents Phantom Reads', status: 'referenced' }
          ]
        },
        important: 'In MySQL InnoDB, the default `REPEATABLE READ` isolation level actually prevents Phantom Reads in practice using Multi-Version Concurrency Control (MVCC) and Next-Key Locks.',
        commonMistakes: [
          'Confusing Non-Repeatable Read (row-level update/delete) with Phantom Read (new row inserted into a range query).',
          'Assuming `SERIALIZABLE` should be used for everything; it can cause massive lock contention and query timeouts in high-throughput workloads.'
        ],
        tip: 'Quick Table Summary: Read Committed prevents Dirty Reads. Repeatable Read prevents Dirty & Non-Repeatable. Serializable prevents all three (including Phantoms).',
        interviewNote: 'Standard Interview Question: "What is a Dirty Read and which SQL isolation level is the minimum required to prevent it?" (Answer: Reading uncommitted data that may roll back; READ COMMITTED is the minimum isolation level that prevents it).',
        practiceQuestions: [
          {
            id: 'q-dbms-9-1',
            type: 'mcq',
            question: 'Which concurrency anomaly occurs when a transaction reads uncommitted modifications made by another transaction that later rolls back?',
            options: ['Non-Repeatable Read', 'Phantom Read', 'Dirty Read', 'Lost Update'],
            correctIndex: 2,
            explanation: 'A Dirty Read occurs when transaction T1 reads data written by uncommitted transaction T2 which subsequently aborts.'
          }
        ],
        relatedTopics: ['dbms-locking-deadlocks', 'dbms-acid-transactions']
      },
      {
        id: 'dbms-locking-deadlocks',
        subjectId: 'dbms',
        chapterId: 'dbms-ch9',
        chapterNumber: 9,
        pageNumber: 20,
        title: 'Locking Protocols (2PL) & Deadlock Management',
        difficulty: 'advanced',
        definition: 'Two-Phase Locking (2PL) is a concurrency control protocol that guarantees conflict serializability by requiring transactions to acquire all locks in a Growing Phase before releasing any locks in a Shrinking Phase.',
        whyItMatters: '2PL prevents data corruption under concurrent load, but improper lock ordering can lead to Deadlocks where two transactions wait forever on each other.',
        syntax: '-- Shared Lock (Read): LOCK IN SHARE MODE / FOR SHARE\n-- Exclusive Lock (Write): FOR UPDATE\nSELECT * FROM inventory WHERE item_id = 10 FOR UPDATE;',
        explanation: [
          'Shared Lock ($S$): Acquired for reading. Multiple transactions can hold concurrent $S$ locks on the same item.',
          'Exclusive Lock ($X$): Acquired for writing/modifying. Only one transaction can hold an $X$ lock; blocks all other $S$ and $X$ lock requests.',
          'Two Phases of 2PL: Phase 1 (Growing Phase): Transaction may acquire locks but cannot release any lock. Phase 2 (Shrinking Phase): Transaction may release locks but cannot acquire any new lock.',
          'Strict 2PL: All Exclusive ($X$) locks acquired by the transaction are held until the transaction finishes (COMMIT or ROLLBACK). Prevents Cascading Aborts!',
          'Deadlock: Occurs when $T_1$ holds Lock A and waits for Lock B, while $T_2$ holds Lock B and waits for Lock A.',
          'Deadlock Handling: Deadlock Prevention (Wait-Die vs Wound-Wait timestamp schemes) and Deadlock Detection (Wait-For Graph cycle detection with victim rollback).'
        ],
        example: {
          language: 'sql',
          code: `-- Explicit Row Locking to Prevent Concurrent Race Conditions\nSTART TRANSACTION;\n\n-- Acquire Exclusive Lock (X-Lock) on inventory row\nSELECT stock_count \nFROM product_inventory \nWHERE product_id = 999 \nFOR UPDATE;\n\n-- Safe deduction without lost update hazard\nUPDATE product_inventory \nSET stock_count = stock_count - 1 \nWHERE product_id = 999;\n\nCOMMIT; -- Releases Exclusive Lock upon completion (Strict 2PL)`,
          output: 'Row locked exclusively. Stock decremented safely.',
          annotations: [
            { line: 5, label: 'Acquires Exclusive (X) lock, blocking concurrent writers', type: 'yellow' },
            { line: 10, label: 'Deterministic update executed within protected lock window', type: 'green' },
            { line: 14, label: 'Strict 2PL releases all locks atomically on COMMIT', type: 'blue' }
          ]
        },
        diagram: {
          type: 'pointer',
          title: 'Wait-For Graph (WFG) Circular Deadlock Condition',
          subtitle: 'Cyclic Dependency Detected by Lock Manager Engine',
          elements: [
            { id: '1', label: 'Transaction T1', sublabel: 'Holds Lock on Row A', value: 'Waits for Row B', status: 'warning', arrowTo: '2' },
            { id: '2', label: 'Transaction T2', sublabel: 'Holds Lock on Row B', value: 'Waits for Row A', status: 'warning', arrowTo: '1' }
          ]
        },
        important: 'Standard 2PL guarantees Conflict Serializability, but it does NOT prevent Deadlocks and does NOT prevent Cascading Rollbacks. Strict 2PL is required to prevent cascading rollbacks.',
        commonMistakes: [
          'Thinking 2PL prevents deadlocks. 2PL is actually susceptible to deadlocks! DBMS engines run background threads every few milliseconds to detect cycles in the Wait-For Graph and abort a victim.',
          'Releasing a lock and then trying to acquire another lock in 2PL. Once you release your first lock, you enter the Shrinking Phase and can NEVER acquire another lock.'
        ],
        tip: 'Wait-Die vs Wound-Wait Mnemonic: In Wait-Die, older waits, younger dies. In Wound-Wait, older preempts/wounds younger, younger waits.',
        interviewNote: 'Classic Technical Interview Question: "Does Two-Phase Locking (2PL) prevent deadlocks?" (Answer: No! 2PL guarantees serializability, but deadlocks can still occur. Strict 2PL additionally prevents cascading aborts).',
        practiceQuestions: [
          {
            id: 'q-dbms-9-2',
            type: 'mcq',
            question: 'What is the key rule of the Shrinking Phase in the Two-Phase Locking (2PL) protocol?',
            options: [
              'The transaction can acquire new locks but cannot release any.',
              'The transaction can release existing locks but cannot acquire any new locks.',
              'All locks must be converted to shared locks.',
              'The transaction must immediately abort.'
            ],
            correctIndex: 1,
            explanation: 'In the Shrinking Phase of 2PL, a transaction is permitted only to release locks; it is strictly prohibited from acquiring any new locks.'
          }
        ],
        relatedTopics: ['dbms-concurrency-control', 'dbms-serializability']
      }
    ]
  },
  {
    id: 'dbms-ch10',
    number: 10,
    title: 'Storage, Indexing & B+ Trees',
    description: 'Physical storage pages, clustered vs secondary indices, B-Trees vs B+ Trees, and query optimization',
    topics: [
      {
        id: 'dbms-storage-indexing',
        subjectId: 'dbms',
        chapterId: 'dbms-ch10',
        chapterNumber: 10,
        pageNumber: 21,
        title: 'File Organization & Indexing Fundamentals',
        difficulty: 'intermediate',
        definition: 'An Index is an auxiliary physical data structure that enables the DBMS storage engine to locate specific records in $O(\\log N)$ or $O(1)$ time without scanning every data block in the table.',
        whyItMatters: 'On a table with 10 million rows, an index seek completes in 3 disk I/O operations (~5 ms), whereas a Full Table Scan requires reading 200,000 disk pages (~10 seconds).',
        syntax: 'CREATE INDEX idx_user_email ON users(email);\nCREATE UNIQUE INDEX idx_order_ref ON orders(order_ref);',
        explanation: [
          'Heap File Organization: Records are placed in arbitrary order on disk pages as they are inserted. Requires $O(N)$ full table scans for queries.',
          'Ordered (Sequential) File: Records physically sorted on a search key. Enables binary search, but insertions and deletions are costly.',
          'Dense Index: Contains an index entry for every single search-key value in the data file.',
          'Sparse Index: Contains index entries for only some of the search keys (typically one entry per physical disk block/page); requires data file to be physically sorted.',
          'Clustered (Primary) Index: Dictates the physical storage order of rows on disk. A table can have at most ONE clustered index (usually on the Primary Key).',
          'Non-Clustered (Secondary) Index: Separate structure containing index keys and pointers (row IDs or clustered key) back to the actual table rows.'
        ],
        example: {
          language: 'sql',
          code: `-- Creating Composite & Covering Indices for Query Optimization\nCREATE TABLE transaction_records (\n    txn_id BIGINT PRIMARY KEY, -- Clustered Index (InnoDB)\n    account_id INT NOT NULL,\n    txn_date DATE NOT NULL,\n    amount DECIMAL(12,2) NOT NULL\n);\n\n-- Composite Secondary Index following Leftmost Prefix Rule\nCREATE INDEX idx_account_date ON transaction_records(account_id, txn_date);\n\n-- Query that utilizes Index Seek over idx_account_date:\nSELECT amount FROM transaction_records \nWHERE account_id = 45091 AND txn_date >= '2026-01-01';`,
          output: 'Query OK, index idx_account_date created. Query cost reduced from 850.0 to 1.2.',
          annotations: [
            { line: 3, label: 'Physical clustered index dictates data storage order', type: 'blue' },
            { line: 10, label: 'Composite index ordered by account_id first, then txn_date', type: 'green' },
            { line: 13, label: 'Satisfies leftmost prefix rule for fast range scan', type: 'yellow' }
          ]
        },
        diagram: {
          type: 'pipeline',
          title: 'Clustered vs Secondary Index Architecture',
          subtitle: 'Physical Data Page Ordering vs Pointer Lookups',
          elements: [
            { id: '1', label: 'Secondary Index', sublabel: 'Search Key: Email', value: 'Pointer to PK', status: 'normal', arrowTo: '2' },
            { id: '2', label: 'Clustered Index B+ Tree', sublabel: 'Search Key: ID (PK)', value: 'Navigates Root -> Leaf', status: 'active', arrowTo: '3' },
            { id: '3', label: 'Physical Leaf Page', sublabel: 'Clustered Disk Block', value: 'Contains Complete Row Data', status: 'referenced' }
          ]
        },
        important: 'A table can have multiple Secondary Indices, but strictly only ONE Clustered Index because physical disk pages can only be sorted in one order.',
        commonMistakes: [
          'Over-indexing every column. Every index consumes disk space and degrades `INSERT`, `UPDATE`, and `DELETE` performance because the engine must update all index trees on every write.',
          'Assuming a Sparse Index can be constructed on an unsorted heap file. A sparse index strictly requires the underlying data file to be sorted.'
        ],
        tip: 'Covering Index: If an index contains all the columns requested by a `SELECT` query, the database never needs to visit the actual table pages. This is known as an Index-Only Scan.',
        interviewNote: 'Top System Design Question: "Why can a table have only one Clustered Index?" (Answer: The clustered index determines the physical on-disk arrangement of the actual data rows; physical records cannot be simultaneously sorted in two different orders).',
        practiceQuestions: [
          {
            id: 'q-dbms-10-1',
            type: 'mcq',
            question: 'Why can a relational database table have at most one Clustered Index?',
            options: [
              'Because SQL syntax permits only one CREATE INDEX statement per table.',
              'Because the clustered index defines the physical sorting order of rows on disk.',
              'Because B+ Trees do not support more than one index root.',
              'Because secondary indexes are strictly required for non-primary columns.'
            ],
            correctIndex: 1,
            explanation: 'The clustered index physically organizes data records on the storage blocks, and data can physically be stored in only one sorted order.'
          }
        ],
        relatedTopics: ['dbms-btree-internals', 'dbms-components']
      },
      {
        id: 'dbms-btree-internals',
        subjectId: 'dbms',
        chapterId: 'dbms-ch10',
        chapterNumber: 10,
        pageNumber: 22,
        title: 'B-Trees vs B+ Trees Architecture',
        difficulty: 'advanced',
        definition: 'A B+ Tree is a self-balancing, multi-way search tree where all actual record data/pointers reside exclusively in the leaf nodes, while internal nodes store only routing search keys. The leaf nodes are linked together as a doubly-linked list.',
        whyItMatters: 'Virtually all major relational databases (MySQL InnoDB, PostgreSQL, Oracle, SQLite) use B+ Trees as their default storage and indexing data structure.',
        syntax: '-- B+ Tree Node Properties:\n-- Max Children (Order m)\n-- Every node except root has at least ⌈m/2⌉ children\n-- Leaf nodes linked sequentially for range queries',
        explanation: [
          'High Fan-Out: Unlike binary search trees (BST) where fan-out is 2, a B+ Tree block matches the disk page size (e.g. 16 KB in InnoDB) and holds hundreds of keys, keeping tree height extremely shallow (height $\\le 3$ or $4$ for billions of rows).',
          'Data Exclusively in Leaves: In standard B-Trees, data pointers are stored in internal nodes as well as leaves. In B+ Trees, internal nodes store only keys and child pointers, allowing internal nodes to hold far more keys and reducing tree height.',
          'Doubly-Linked Leaf Nodes: Leaf nodes form a continuous bidirectional linked list, making range scans (`WHERE age BETWEEN 20 AND 30`) fast sequential I/O sweeps without tree re-traversals.',
          'Predictable Search Cost: Because all data pointers reside in leaf nodes, every key search traverses the exact same number of levels from root to leaf, giving uniform $O(\\log N)$ latency.'
        ],
        example: {
          language: 'sql',
          code: `-- High-Performance Range Scan Enabled by B+ Tree Leaf Pointers\n-- 1. Traverse from Root to Leaf via Binary Search on keys (3-4 I/O hops)\n-- 2. Once the starting leaf node is reached, scan sequentially across leaves!\nSELECT order_id, order_total \nFROM orders \nWHERE order_date BETWEEN '2026-03-01' AND '2026-03-31';`,
          output: `+----------+-------------+\n| order_id | order_total |\n+----------+-------------+\n| 88401    | 240.50      |\n| 88402    | 1150.00     |\n| 88499    | 89.90       |\n+----------+-------------+\n-- 500 rows retrieved via sequential leaf pointer traversal!`,
          annotations: [
            { line: 4, label: 'B+ Tree internal nodes route search to March 1st leaf node', type: 'blue' },
            { line: 5, label: 'Horizontal sequential sweep across linked leaf nodes', type: 'green' }
          ]
        },
        diagram: {
          type: 'tree',
          title: 'B+ Tree Multi-Way Search & Leaf Linked-List',
          subtitle: 'Internal Routing Nodes Direct Traffic to Sequentially-Linked Leaves',
          elements: [
            { id: '1', label: 'Root Node [50]', sublabel: 'Internal Routing Key', value: 'Page 1', status: 'active', arrowTo: '2' },
            { id: '2', label: 'Internal Node [< 50]', sublabel: 'Keys: [20, 35]', value: 'Page 2', status: 'normal', arrowTo: '4' },
            { id: '3', label: 'Internal Node [>= 50]', sublabel: 'Keys: [65, 80]', value: 'Page 3', status: 'normal', arrowTo: '5' },
            { id: '4', label: 'Leaf Page [10, 15, 20]', sublabel: 'Data Pointers', value: 'Links -> Next Leaf', status: 'referenced', arrowTo: '5' },
            { id: '5', label: 'Leaf Page [50, 55, 65]', sublabel: 'Data Pointers', value: 'Doubly-Linked List', status: 'referenced' }
          ]
        },
        important: 'Databases choose B+ Trees over B-Trees because internal nodes without data pointers have a higher fan-out (fit more keys per 16KB page), resulting in a shallower tree that requires fewer disk I/O operations.',
        commonMistakes: [
          'Confusing B-Tree with Binary Search Tree. The "B" stands for Balanced or Bayer (its inventor), NOT Binary! B-Trees have hundreds of branches per node.',
          'Believing Hash Indices are always superior to B+ Trees. Hash indices provide $O(1)$ lookups for exact equality (`=`), but CANNOT support range queries (`>`, `<`, `BETWEEN`), which B+ Trees handle efficiently.'
        ],
        tip: 'Remember the 2 main reasons B+ Trees beat B-Trees: 1. Higher Fan-out (shallower height = fewer disk reads). 2. Doubly-linked leaves (lightning-fast range scans).',
        interviewNote: '#1 Most Important Database Engine Interview Question: "Why do relational database engines use B+ Trees instead of B-Trees or Binary Search Trees?" (Highlight disk page block size, tree height reduction, and sequential range query sweeps via leaf linked lists).',
        practiceQuestions: [
          {
            id: 'q-dbms-10-2',
            type: 'mcq',
            question: 'What architectural feature of B+ Trees makes them vastly superior to standard B-Trees for range queries like `BETWEEN`?',
            options: [
              'Leaf nodes are connected in a continuous doubly-linked list.',
              'Internal nodes contain duplicate data records.',
              'All nodes have a maximum fan-out of 2.',
              'B+ Trees store hash keys rather than comparison keys.'
            ],
            correctIndex: 0,
            explanation: 'In a B+ Tree, leaf nodes are chained in a sequential linked list, allowing range queries to simply scan across leaves after a single initial tree seek.'
          }
        ],
        relatedTopics: ['dbms-storage-indexing', 'dbms-components']
      }
    ]
  }
];
