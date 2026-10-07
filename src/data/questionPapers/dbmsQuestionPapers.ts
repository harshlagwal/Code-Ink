import { SubjectQuestionPapers } from '../../types/notebook';

export const DBMS_QUESTION_PAPERS: SubjectQuestionPapers = {
  subjectId: 'dbms',
  subjectName: 'Database Management Systems & SQL Engineering',
  courseCode: 'CS-204-DBMS',
  sets: {
    'set-1': {
      setId: 'set-1',
      setName: 'Set 1 (Set A)',
      paperCode: 'CS-204-DBMS-S1',
      title: 'Database Architecture, Relational Model & SQL Query Design',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-204-DBMS',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).',
        'Draw clear ER diagrams, relational schema reduction steps, and SQL execution plan trees where appropriate.'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark. Answer concisely in your notebook.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'dbms-s1-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Data Independence',
              question: 'Differentiate between Physical Data Independence and Logical Data Independence.',
              markingBreakdown: ['Accurate definition of physical vs logical independence: 1 Mark'],
              modelSolution: 'Physical Data Independence is the capacity to alter physical storage or index structures without altering conceptual schemas. Logical Data Independence is the capacity to modify the conceptual schema without altering external views or application code.',
              notebookCheckpoints: ['Internal vs Conceptual modification', 'Application isolation']
            },
            {
              id: 'dbms-s1-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Relational Degree vs Cardinality',
              question: 'Define Degree and Cardinality of a database relation.',
              markingBreakdown: ['Degree = column count, Cardinality = row count: 1 Mark'],
              modelSolution: 'Degree is the total number of attributes (columns) in a relation schema. Cardinality is the total number of tuples (rows) present in the relation instance.',
              notebookCheckpoints: ['Degree = columns', 'Cardinality = tuples']
            },
            {
              id: 'dbms-s1-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Entity Integrity',
              question: 'State the Entity Integrity constraint in relational databases.',
              markingBreakdown: ['Primary key non-null rule: 1 Mark'],
              modelSolution: 'Entity Integrity states that no primary key attribute value can be NULL because it serves to uniquely identify individual tuples in a relation.',
              notebookCheckpoints: ['No NULL in Primary Key', 'Unique identification']
            },
            {
              id: 'dbms-s1-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Candidate Key Definition',
              question: 'What is a Candidate Key, and how does it differ from a Super Key?',
              markingBreakdown: ['Candidate Key = minimal Super Key: 1 Mark'],
              modelSolution: 'A Candidate Key is a minimal Super Key containing no redundant attributes. Removing any attribute from a Candidate Key destroys its uniqueness property.',
              notebookCheckpoints: ['Minimal super key', 'Zero redundant attributes']
            },
            {
              id: 'dbms-s1-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'SQL DDL vs DML',
              question: 'Why is TRUNCATE classified as a DDL statement while DELETE is a DML statement?',
              markingBreakdown: ['Page deallocation vs row logging: 1 Mark'],
              modelSolution: 'TRUNCATE is DDL because it deallocates all underlying data storage pages directly and implicitly commits without logging row-by-row deletions, whereas DELETE is a logged DML operation.',
              notebookCheckpoints: ['DDL page deallocation', 'DML row-by-row logging']
            },
            {
              id: 'dbms-s1-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'HAVING vs WHERE',
              question: 'Why can aggregate functions like AVG() or SUM() not be placed in a WHERE clause?',
              markingBreakdown: ['Evaluation order explanation: 1 Mark'],
              modelSolution: 'Because the WHERE clause is evaluated row-by-row before grouping and aggregation occur in the SQL logical query pipeline. Aggregations must be filtered in the HAVING clause.',
              notebookCheckpoints: ['WHERE runs before grouping', 'HAVING runs after aggregation']
            },
            {
              id: 'dbms-s1-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'SQL Three-Valued Logic',
              question: 'Why does `SELECT * FROM table WHERE column = NULL;` return zero rows even if null rows exist?',
              markingBreakdown: ['Explanation of NULL 3VL evaluation: 1 Mark'],
              modelSolution: 'In SQL three-valued logic (3VL), comparing any value to NULL using `=` evaluates to UNKNOWN, which the WHERE clause filters out as false. One must use `IS NULL`.',
              notebookCheckpoints: ['Three-valued logic', 'Use IS NULL']
            },
            {
              id: 'dbms-s1-q8',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Cartesian Product Cardinality',
              question: 'If relation R has 8 rows and relation S has 12 rows, what is the cardinality of R × S?',
              markingBreakdown: ['8 × 12 = 96 rows: 1 Mark'],
              modelSolution: 'Cardinality of Cartesian product = Cardinality(R) × Cardinality(S) = 8 × 12 = 96 tuples.',
              notebookCheckpoints: ['Multiplication rule: 96 rows']
            },
            {
              id: 'dbms-s1-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Weak Entity Discriminator',
              question: 'What is the discriminator (partial key) of a weak entity set?',
              markingBreakdown: ['Definition of discriminator: 1 Mark'],
              modelSolution: 'The discriminator (or partial key) is the set of attributes that distinguishes weak entities related to the same strong identifying parent entity.',
              notebookCheckpoints: ['Partial key', 'Dashed underline symbol']
            },
            {
              id: 'dbms-s1-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Clustered Index Constraint',
              question: 'Why can a relational database table have at most ONE clustered index?',
              markingBreakdown: ['Physical data order uniqueness: 1 Mark'],
              modelSolution: 'A clustered index determines the physical on-disk sorting order of data records; since records can only be physically stored in one sequential order, only one clustered index can exist.',
              notebookCheckpoints: ['Physical data sorting order', 'Single order on disk']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Query Engineering',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks. Write comprehensive derivations.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s1-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'ER Diagram to Relational Reduction',
              question: 'Explain the reduction rules for mapping: (a) A 1:N relationship, (b) An M:N relationship, and (c) A Multivalued Attribute into relational tables.',
              markingBreakdown: [
                '1:N mapping rule with foreign key placement: 2 Marks',
                'M:N mapping rule with junction table: 2 Marks',
                'Multivalued attribute table mapping: 1 Mark'
              ],
              modelSolution: '(a) 1:N Relationship: The primary key of the 1-side entity is placed as a foreign key inside the table representing the N-side (Many-side) entity.\n(b) M:N Relationship: Cannot be placed directly in either entity table without repeating rows. A separate associative/junction table is created with foreign keys referencing both entities, forming a composite primary key.\n(c) Multivalued Attribute: Created as a separate child table containing the attribute value along with the primary key of the parent entity as a foreign key.',
              notebookCheckpoints: ['1:N -> FK on Many side', 'M:N -> Junction table', 'Multivalued -> Separate table']
            },
            {
              id: 'dbms-s1-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Attribute Closure & Candidate Keys',
              question: 'Given relation R(A, B, C, D, E) with functional dependencies: F = { AB -> C, C -> D, D -> E, E -> A }. Determine all Candidate Keys of relation R.',
              markingBreakdown: [
                'Calculation of closure (AB)+: 2 Marks',
                'Derivation of remaining candidate keys (CB, DB, EB): 2 Marks',
                'Final minimal candidate key declaration: 1 Mark'
              ],
              modelSolution: 'Step 1: Notice B is absent from the RHS of all FDs, so B must belong to every Candidate Key.\nStep 2: Compute (AB)+ = {A, B, C, D, E} -> AB is a Candidate Key.\nStep 3: Since E -> A, replace A with E: (EB)+ = {E, B, A, C, D} -> EB is a Candidate Key.\nStep 4: Since D -> E, replace E with D: (DB)+ = {D, B, E, A, C} -> DB is a Candidate Key.\nStep 5: Since C -> D, replace D with C: (CB)+ = {C, B, D, E, A} -> CB is a Candidate Key.\nConclusion: The Candidate Keys of R are {AB, CB, DB, EB}.',
              notebookCheckpoints: ['B must be present', '4 Candidate Keys: AB, CB, DB, EB']
            },
            {
              id: 'dbms-s1-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'SQL Joins & Anti-Join',
              question: 'Given tables `customers(customer_id, name)` and `orders(order_id, customer_id, amount)`: Write SQL queries for: (a) Fetch all customers and their total spend (including zero spenders), and (b) Find customers who placed NO orders using LEFT JOIN.',
              markingBreakdown: [
                'Correct LEFT JOIN with GROUP BY and COALESCE: 3 Marks',
                'Anti-join using IS NULL predicate: 2 Marks'
              ],
              modelSolution: '(a) Total spend including zero spenders:\n```sql\nSELECT c.customer_id, c.name, COALESCE(SUM(o.amount), 0.00) AS total_spend\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.name;\n```\n(b) Customers with no orders (Anti-Join):\n```sql\nSELECT c.customer_id, c.name\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;\n```',
              notebookCheckpoints: ['LEFT JOIN with COALESCE', 'WHERE right_key IS NULL']
            },
            {
              id: 'dbms-s1-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Conflict Serializability & Precedence Graph',
              question: 'Consider schedule S: R1(X), R2(X), W1(X), W2(X), R1(Y), W1(Y). Draw the Precedence Graph and determine if S is Conflict Serializable.',
              markingBreakdown: [
                'Identification of all conflicting operation pairs: 2 Marks',
                'Drawing of edges in Precedence Graph: 2 Marks',
                'Cycle analysis and conclusion: 1 Mark'
              ],
              modelSolution: 'Conflicting pairs on item X:\n1. R2(X) before W1(X) => Directed Edge: T2 -> T1\n2. W1(X) before W2(X) => Directed Edge: T1 -> T2\n\nGraph Evaluation: There exists an edge from T2 -> T1 and an edge from T1 -> T2, creating a directed cycle between T1 and T2.\nConclusion: Because the Precedence Graph contains a directed cycle, Schedule S is NOT Conflict Serializable.',
              notebookCheckpoints: ['T2 -> T1 and T1 -> T2 edges', 'Cycle detected -> Not Conflict Serializable']
            },
            {
              id: 'dbms-s1-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Window Functions & Ranking',
              question: 'Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() with an illustrative table example of scores [95, 90, 90, 80].',
              markingBreakdown: [
                'Accurate distinction between the three functions: 3 Marks',
                'Illustrative trace table: 2 Marks'
              ],
              modelSolution: 'Scores: [95, 90, 90, 80]\n- ROW_NUMBER(): Assigns strict sequential integers [1, 2, 3, 4] with zero ties.\n- RANK(): Assigns identical ranks to ties and skips subsequent numbers: [1, 2, 2, 4] (rank 3 is skipped).\n- DENSE_RANK(): Assigns identical ranks to ties without skipping subsequent numbers: [1, 2, 2, 3].',
              notebookCheckpoints: ['ROW_NUMBER = no ties', 'RANK = skips ties', 'DENSE_RANK = no skip']
            },
            {
              id: 'dbms-s1-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Two-Phase Locking (2PL)',
              question: 'Explain the Growing and Shrinking phases of Two-Phase Locking (2PL). Why does 2PL guarantee serializability but not prevent deadlocks?',
              markingBreakdown: [
                'Growing Phase and Shrinking Phase rules: 2 Marks',
                'Proof of serializability: 1 Mark',
                'Deadlock occurrence explanation: 2 Marks'
              ],
              modelSolution: 'Growing Phase: Transaction may obtain locks, but cannot release any lock.\nShrinking Phase: Transaction may release locks, but cannot acquire new locks.\nSerializability: The lock point (moment when the transaction acquires its final lock) provides an ordering equivalent to a serial schedule.\nDeadlocks: Transactions can request locks in reverse orders while holding initial locks (e.g. T1 holds A, waits for B; T2 holds B, waits for A), leading to deadlocks.',
              notebookCheckpoints: ['Growing = acquire only', 'Shrinking = release only', 'Deadlock circular wait']
            },
            {
              id: 'dbms-s1-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Lossless Join & Dependency Preservation',
              question: 'State the formal criteria for a database decomposition to be: (a) Lossless Join, and (b) Dependency Preserving.',
              markingBreakdown: [
                'Lossless Join intersection criteria: 3 Marks',
                'Dependency preservation union criteria: 2 Marks'
              ],
              modelSolution: '(a) Lossless Join Decomposition: Decomposing R into R1 and R2 is lossless if and only if the common attributes (R1 ∩ R2) form a Super Key in either R1 or R2 (i.e. (R1 ∩ R2) -> R1 OR (R1 ∩ R2) -> R2).\n(b) Dependency Preservation: Decomposition preserves dependencies if the union of functional dependencies valid in each decomposed table covers all original FDs (i.e. (F1 ∪ F2)+ = F+).',
              notebookCheckpoints: ['Common attributes must be Super Key', '(F1 ∪ F2)+ = F+']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Normalization',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks. Detailed diagrams and proofs required.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s1-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Complete Normalization Process',
              question: 'Given relation R(EmpID, EmpName, DeptNo, DeptName, ProjectID, ProjectName, Hours) with composite key {EmpID, ProjectID} and FDs:\nEmpID -> EmpName\nDeptNo -> DeptName\nEmpID -> DeptNo\nProjectID -> ProjectName\n{EmpID, ProjectID} -> Hours\n(a) Identify anomalies in relation R.\n(b) Step-by-step decompose relation R into 2NF, and then into 3NF.\n(c) Verify if the decomposition is Lossless and Dependency Preserving.',
              markingBreakdown: [
                'Anomalies identification (Insertion, Deletion, Update): 2 Marks',
                '2NF decomposition removing partial dependencies: 3 Marks',
                '3NF decomposition removing transitive dependencies: 3 Marks',
                'Lossless and dependency preservation verification: 2 Marks'
              ],
              modelSolution: '(a) Anomalies:\n- Partial dependencies: EmpName and DeptNo depend only on EmpID; ProjectName depends only on ProjectID.\n- Transitive dependency: EmpID -> DeptNo and DeptNo -> DeptName.\n- Anomalies: Cannot create a project without an employee (Insert Anomaly); deleting an employee can delete project info (Delete Anomaly).\n\n(b) Decomposing into 2NF:\nRemove partial dependencies by splitting into:\n- R1(EmpID, EmpName, DeptNo, DeptName) [PK: EmpID]\n- R2(ProjectID, ProjectName) [PK: ProjectID]\n- R3(EmpID, ProjectID, Hours) [PK: (EmpID, ProjectID)]\n\n(c) Decomposing R1 into 3NF:\nR1 contains transitive dependency: EmpID -> DeptNo and DeptNo -> DeptName.\nDecompose R1 into:\n- Employees(EmpID, EmpName, DeptNo) [PK: EmpID, FK: DeptNo]\n- Departments(DeptNo, DeptName) [PK: DeptNo]\n\nFinal 3NF Schema: Employees, Departments, Projects, and Project_Assignments. This decomposition is completely Lossless and preserves all dependencies.',
              notebookCheckpoints: ['2NF splits partial keys', '3NF splits transitive keys', '4 normalized tables']
            },
            {
              id: 'dbms-s1-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'ACID Properties & Crash Recovery (ARIES/WAL)',
              question: 'Discuss the ACID properties in depth. Explain the Write-Ahead Logging (WAL) protocol and how the DBMS Recovery Manager uses Redo and Undo passes to recover from a sudden system crash.',
              markingBreakdown: [
                'Detailed breakdown of A, C, I, D: 4 Marks',
                'Write-Ahead Logging (WAL) protocol explanation: 3 Marks',
                'Redo and Undo phase crash recovery mechanics: 3 Marks'
              ],
              modelSolution: '1. ACID Properties:\n- Atomicity: All operations in transaction succeed or none do (Recovery Manager).\n- Consistency: DB transitions from one valid state to another satisfying all invariants.\n- Isolation: Intermediate states hidden from concurrent transactions (Concurrency Manager).\n- Durability: Committed updates survive system crashes (Storage/WAL).\n\n2. Write-Ahead Logging (WAL):\nBefore dirty data pages are flushed to disk, the corresponding log records describing the change MUST be flushed to non-volatile disk. This ensures crash recovery can reconstruct state.\n\n3. Crash Recovery (ARIES Algorithm):\n- Analysis Pass: Scans log from last checkpoint to identify dirty pages and active transactions at crash time.\n- Redo Pass: Repeats all actions of both committed and uncommitted transactions up to crash point to restore pre-crash state.\n- Undo Pass: Reverses changes of transactions that were active at crash time in reverse chronological order, guaranteeing Atomicity.',
              notebookCheckpoints: ['WAL log before data flush', 'Analysis, Redo, Undo passes']
            },
            {
              id: 'dbms-s1-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'B+ Tree Indexing & Query Optimization',
              question: 'Explain the internal architecture of a B+ Tree index. Show why internal nodes have high fan-out, how range scans are performed via leaf pointers, and explain the Leftmost Prefix Rule in composite indexing.',
              markingBreakdown: [
                'B+ Tree structural diagram and fan-out explanation: 4 Marks',
                'Leaf node doubly-linked list range scan mechanism: 3 Marks',
                'Composite index leftmost prefix rule with SQL example: 3 Marks'
              ],
              modelSolution: '1. B+ Tree Internal Architecture:\n- Multi-way self-balancing search tree.\n- Internal nodes store search keys and child page pointers ONLY (no data records). Because keys are small (e.g. 8 bytes) and disk pages are large (16 KB), fan-out is high (hundreds of keys per page), keeping tree height at 3-4 levels for billions of rows.\n\n2. Leaf Linked List Range Scans:\n- Leaf nodes contain all actual search keys and data record pointers.\n- Leaf nodes are chained horizontally as a bidirectional linked list.\n- For a query like `WHERE date BETWEEN t1 AND t2`, the engine seeks to t1 in O(log N) tree hops, then scans horizontally through leaf blocks until t2 is reached without traversing the tree again.\n\n3. Leftmost Prefix Rule:\n- An index on (A, B, C) can satisfy queries filtering on (A), (A, B), or (A, B, C).\n- It CANNOT satisfy a query filtering only on (B) or (C) because keys are sorted lexicographically starting with attribute A first.',
              notebookCheckpoints: ['High fan-out shallow tree', 'Sequential leaf scan', 'Leftmost prefix rule']
            }
          ]
        }
      }
    },
    'set-2': {
      setId: 'set-2',
      setName: 'Set 2 (Set B)',
      paperCode: 'CS-204-DBMS-S2',
      title: 'Advanced Normalization, Concurrency Control & Index Structures',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-204-DBMS',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'dbms-s2-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Super Key Minimality',
              question: 'Can a Super Key contain redundant attributes? Explain in one sentence.',
              markingBreakdown: ['Yes, definition: 1 Mark'],
              modelSolution: 'Yes, a Super Key is any attribute set that guarantees uniqueness, and it may contain unnecessary redundant columns.',
              notebookCheckpoints: ['Super Key allows redundancy']
            },
            {
              id: 'dbms-s2-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Referential Integrity Actions',
              question: 'What does the clause `ON DELETE CASCADE` do in a foreign key constraint?',
              markingBreakdown: ['Cascading row deletion: 1 Mark'],
              modelSolution: 'When a row in the parent table is deleted, all matching referencing rows in the child table are automatically deleted.',
              notebookCheckpoints: ['Automatic child row deletion']
            },
            {
              id: 'dbms-s2-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Natural Join vs Cartesian Product',
              question: 'How does Natural Join differ from Cartesian Product?',
              markingBreakdown: ['Equi-join on common attributes: 1 Mark'],
              modelSolution: 'Natural Join performs an equi-join matching identical column names across two relations and projects out duplicate columns, while Cartesian Product combines all rows unconditionally.',
              notebookCheckpoints: ['Matches common attributes', 'Removes duplicate columns']
            },
            {
              id: 'dbms-s2-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Armstrong Axioms',
              question: 'State Armstrong’s Transitivity Axiom.',
              markingBreakdown: ['Transitivity statement: 1 Mark'],
              modelSolution: 'If X -> Y and Y -> Z hold, then X -> Z must also hold.',
              notebookCheckpoints: ['X -> Y and Y -> Z implies X -> Z']
            },
            {
              id: 'dbms-s2-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'BCNF vs 3NF',
              question: 'Why is every BCNF relation automatically in 3NF, but not vice versa?',
              markingBreakdown: ['Strictness of determinant: 1 Mark'],
              modelSolution: 'BCNF strictly requires the determinant X to be a super key for all non-trivial FDs, whereas 3NF allows an exception if the dependent Y is a prime attribute.',
              notebookCheckpoints: ['BCNF determinant must be Super Key']
            },
            {
              id: 'dbms-s2-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Transaction States',
              question: 'When does a transaction transition from Active to Partially Committed?',
              markingBreakdown: ['After last statement execution: 1 Mark'],
              modelSolution: 'A transaction enters the Partially Committed state immediately after its final operational statement has executed, pending log disk flush.',
              notebookCheckpoints: ['Final statement executed']
            },
            {
              id: 'dbms-s2-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Dirty Read Definition',
              question: 'Define the Dirty Read concurrency anomaly.',
              markingBreakdown: ['Reading uncommitted aborted data: 1 Mark'],
              modelSolution: 'A Dirty Read occurs when a transaction reads uncommitted changes written by another transaction that later rolls back.',
              notebookCheckpoints: ['Reading uncommitted data']
            },
            {
              id: 'dbms-s2-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Strict 2PL Advantage',
              question: 'What major problem of basic 2PL does Strict 2PL solve?',
              markingBreakdown: ['Cascading aborts prevention: 1 Mark'],
              modelSolution: 'Strict 2PL holds exclusive locks until transaction commit/rollback, preventing Cascading Aborts (cascading rollbacks).',
              notebookCheckpoints: ['Prevents cascading rollbacks']
            },
            {
              id: 'dbms-s2-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'Dense vs Sparse Index',
              question: 'What is the structural difference between a Dense Index and a Sparse Index?',
              markingBreakdown: ['Every key vs sample key entry: 1 Mark'],
              modelSolution: 'A Dense Index has an index entry for every search-key value in the data file, whereas a Sparse Index contains entries for only some keys (e.g. one per block).',
              notebookCheckpoints: ['Dense = all keys', 'Sparse = block headers']
            },
            {
              id: 'dbms-s2-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Covering Index',
              question: 'What is a Covering Index in database query optimization?',
              markingBreakdown: ['Index containing all query columns: 1 Mark'],
              modelSolution: 'A covering index contains all the columns requested by a query, allowing the engine to satisfy the query directly from index pages without fetching table heap pages.',
              notebookCheckpoints: ['Index-only scan']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Query Engineering',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s2-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Candidate Key Computation',
              question: 'Given relation R(A, B, C, D) with F = { A -> B, B -> C, C -> A, D -> B }. Find all candidate keys of R.',
              markingBreakdown: ['Closure calculations: 3 Marks', 'Final candidate keys: 2 Marks'],
              modelSolution: 'Step 1: Check RHS. Attributes A, B, C are on the RHS. Attribute D is NOT on the RHS of any FD, so D must be part of every candidate key.\nStep 2: Test combinations with D:\n- (AD)+ = {A, D, B, C} -> AD is a Candidate Key.\n- (BD)+ = {B, D, C, A} -> BD is a Candidate Key.\n- (CD)+ = {C, D, A, B} -> CD is a Candidate Key.\nConclusion: Candidate Keys of R are {AD, BD, CD}.',
              notebookCheckpoints: ['D must be in all keys', 'Keys: AD, BD, CD']
            },
            {
              id: 'dbms-s2-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'SQL CTE & Top-N Salary Query',
              question: 'Write an optimized SQL query using a Common Table Expression (CTE) and DENSE_RANK() to find the 3rd highest salary in each department.',
              markingBreakdown: ['CTE syntax with DENSE_RANK: 3 Marks', 'Filter query: 2 Marks'],
              modelSolution: '```sql\nWITH RankedSalaries AS (\n    SELECT \n        emp_id, \n        emp_name, \n        dept_id, \n        salary,\n        DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rank_num\n    FROM employees\n)\nSELECT emp_id, emp_name, dept_id, salary\nFROM RankedSalaries\nWHERE rank_num = 3;\n```',
              notebookCheckpoints: ['PARTITION BY dept_id', 'WHERE rank_num = 3']
            },
            {
              id: 'dbms-s2-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Deadlock Handling Strategies',
              question: 'Compare Wait-Die and Wound-Wait deadlock prevention timestamp schemes. Which scheme avoids starvation?',
              markingBreakdown: ['Wait-Die rule: 2 Marks', 'Wound-Wait rule: 2 Marks', 'Starvation comparison: 1 Mark'],
              modelSolution: '- Wait-Die (Non-preemptive): When Ti requests a lock held by Tj:\n  If Ti is older (TS(Ti) < TS(Tj)), Ti is allowed to wait. If Ti is younger, Ti dies (rolls back).\n- Wound-Wait (Preemptive): When Ti requests a lock held by Tj:\n  If Ti is older, Ti wounds/preempts Tj and forces Tj to roll back. If Ti is younger, Ti waits.\n- Starvation: Both prevent deadlocks, but older transactions in Wound-Wait never experience rollback, minimizing starvation.',
              notebookCheckpoints: ['Wait-Die: older waits, younger dies', 'Wound-Wait: older wounds younger']
            },
            {
              id: 'dbms-s2-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: '2NF Testing',
              question: 'Given relation R(A, B, C, D) with composite candidate key {A, B} and FDs: { AB -> C, B -> D }. Identify normal form and explain why it violates 2NF.',
              markingBreakdown: ['Partial dependency identified: 3 Marks', 'Decomposition to 2NF: 2 Marks'],
              modelSolution: '1. Candidate Key is {A, B}. Prime attributes are A and B; Non-prime attributes are C and D.\n2. In FD `B -> D`, non-prime attribute D depends on B, which is a proper subset of candidate key {A, B}. This is a Partial Dependency!\n3. Therefore, R violates 2NF and is only in 1NF.\n4. Decomposition into 2NF: R1(B, D) with PK {B}, and R2(A, B, C) with PK {A, B}.',
              notebookCheckpoints: ['B -> D is partial dependency', 'Decompose into R1(B,D) and R2(A,B,C)']
            },
            {
              id: 'dbms-s2-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'ANSI Isolation Levels',
              question: 'Tabulate the four ANSI SQL Isolation Levels against the anomalies they prevent (Dirty Read, Non-Repeatable Read, Phantom Read).',
              markingBreakdown: ['Complete comparison table: 5 Marks'],
              modelSolution: '| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |\n|---|---|---|---|\n| READ UNCOMMITTED | Allowed | Allowed | Allowed |\n| READ COMMITTED | Prevented | Allowed | Allowed |\n| REPEATABLE READ | Prevented | Prevented | Allowed |\n| SERIALIZABLE | Prevented | Prevented | Prevented |',
              notebookCheckpoints: ['4 levels correctly tabulated', 'Serializable prevents all 3']
            },
            {
              id: 'dbms-s2-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'Relational Algebra Equivalence',
              question: 'Show why the heuristic rule "Push Selections Down the Tree" improves relational query execution performance.',
              markingBreakdown: ['Cartesian product size reduction: 3 Marks', 'Memory I/O explanation: 2 Marks'],
              modelSolution: 'Applying selection (σ) before a join or Cartesian product reduces the cardinality of intermediate relations early. If relation R has 10,000 rows and only 100 match the filter, pushing selection down reduces join input from 10,000 to 100 tuples, decreasing memory usage and CPU comparison cost by orders of magnitude.',
              notebookCheckpoints: ['Early row reduction', 'Reduces join input cardinality']
            },
            {
              id: 'dbms-s2-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Self Join Hierarchy',
              question: 'Given an employee table with `(emp_id, emp_name, manager_id)`: Write a SQL query using SELF JOIN to display employee name, manager name, and handle top executives without a manager.',
              markingBreakdown: ['SELF JOIN with LEFT JOIN: 3 Marks', 'COALESCE handling NULLs: 2 Marks'],
              modelSolution: '```sql\nSELECT \n    e.emp_name AS employee,\n    COALESCE(m.emp_name, \'Top Executive\') AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id;\n```',
              notebookCheckpoints: ['LEFT JOIN with self alias', 'COALESCE for CEO']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Normalization',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s2-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'BCNF Decomposition Algorithm',
              question: 'Given relation R(A, B, C, D, E) with FDs: F = { A -> B, BC -> D, E -> C, D -> A }.\n(a) Determine all candidate keys.\n(b) Test if R is in BCNF.\n(c) If not, decompose R into BCNF step by step, and verify if the decomposition preserves all functional dependencies.',
              markingBreakdown: [
                'Candidate keys identification: 3 Marks',
                'BCNF violation check: 2 Marks',
                'BCNF step-by-step decomposition: 3 Marks',
                'Dependency preservation check: 2 Marks'
              ],
              modelSolution: '(a) Candidate Keys:\nNotice E is not on RHS of any FD, so E must be in all candidate keys.\n- (AE)+ = {A, E, B, C, D} -> AE is a Candidate Key.\n- (DE)+ = {D, E, A, B, C} -> DE is a Candidate Key.\n- (BCE)+ = {B, C, E, D, A} -> BCE is a Candidate Key.\n\n(b) BCNF Check:\nIn FD A -> B, determinant A is NOT a super key (only AE, DE, BCE are super keys).\nTherefore, R violates BCNF.\n\n(c) BCNF Decomposition:\nDecompose R using violating FD A -> B into:\n- R1(A, B) with PK {A} (in BCNF)\n- R2(A, C, D, E)\nIn R2, E -> C violates BCNF (E is not a super key). Decompose R2 into:\n- R3(E, C) with PK {E}\n- R4(A, D, E) with PK {AE}\nFinal BCNF Relations: R1(A,B), R3(E,C), R4(A,D,E).\nNote: Dependency BC -> D is lost in this BCNF decomposition, demonstrating that BCNF does not always preserve dependencies.',
              notebookCheckpoints: ['AE, DE, BCE keys', 'BCNF violates on A -> B', 'Loss of BC -> D']
            },
            {
              id: 'dbms-s2-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Conflict vs View Serializability',
              question: 'Define Conflict Serializability and View Serializability. Construct a schedule that is View Serializable but NOT Conflict Serializable, and explain why testing for View Serializability is NP-Complete.',
              markingBreakdown: [
                'Definitions of conflict and view serializability: 4 Marks',
                'Blind write example distinguishing both: 4 Marks',
                'NP-complete complexity rationale: 2 Marks'
              ],
              modelSolution: '1. Definitions:\n- Conflict Serializability: A schedule conflict equivalent to a serial schedule by swapping non-conflicting adjacent operations.\n- View Serializability: A schedule view equivalent to a serial schedule where initial reads, updated reads, and final writes match.\n\n2. View Serializable but NOT Conflict Serializable (Blind Writes):\nConsider Schedule S:\nT1: R(A), W(A)\nT2: W(A)  -- Blind write\nT3: W(A)  -- Final write\n- Conflict analysis creates conflicting pairs between all three transactions leading to cyclic dependencies.\n- However, view equivalence holds with serial schedule <T1, T2, T3> because T1 performs initial read, T3 performs final write, and no intermediate reads exist.\n\n3. Complexity: Because checking view equivalence involves searching over all N! permutations of serial schedules in the presence of blind writes, the problem is NP-Complete.',
              notebookCheckpoints: ['View includes blind writes', 'NP-complete search space']
            },
            {
              id: 'dbms-s2-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'B+ Tree Insertions & Split Mechanics',
              question: 'Describe how insertions into a B+ Tree are handled when a leaf node overflows. Illustrate the node splitting process, key promotion to parent nodes, and root page splitting.',
              markingBreakdown: [
                'Leaf node overflow and split mechanics: 4 Marks',
                'Key copying to parent vs key promotion: 3 Marks',
                'Root node split and tree height growth: 3 Marks'
              ],
              modelSolution: '1. Leaf Node Split:\n- A leaf node holds at most m-1 keys. When an insertion causes overflow (m keys):\n- The node is split into two halves: Left node retains ⌈m/2⌉ keys, and Right node holds remaining keys.\n- The smallest key in the right node is copied (not removed) into the parent internal node.\n- The doubly-linked leaf pointers are updated to link left node to right node.\n\n2. Internal Node Split:\n- When an internal node overflows, it splits similarly, but the middle key is pushed/promoted up to its parent (removed from internal node, unlike leaves).\n\n3. Root Split (Tree Height Growth):\n- When the root overflows, it splits into two child nodes and a new root node is created with a single key.\n- This is the ONLY way a B+ Tree grows in height, ensuring balanced growth from the top down.',
              notebookCheckpoints: ['Leaf copies key to parent', 'Root split grows tree height']
            }
          ]
        }
      }
    },
    'set-3': {
      setId: 'set-3',
      setName: 'Set 3 (Set C)',
      paperCode: 'CS-204-DBMS-S3',
      title: 'Database Systems Implementation, Query Processing & Transaction Recovery',
      academicSession: 'Annual Engineering Examination · Paper Code: CS-204-DBMS',
      totalMarks: 50,
      durationMinutes: 120,
      instructions: [
        'Time Allowed: 2 Hours | Maximum Marks: 50.',
        'This question paper is meant for manual pen-and-paper solving in your physical Engineering Notebook.',
        'Section A (Q1 to Q10) is COMPULSORY (10 × 1 = 10 Marks).',
        'Section B (Q11 to Q17) contains 7 questions. Attempt ANY 4 questions (4 × 5 = 20 Marks).',
        'Section C (Q18 to Q20) contains 3 questions. Attempt ANY 2 questions (2 × 10 = 20 Marks).'
      ],
      sections: {
        sectionA: {
          title: 'Section A: Objective & Conceptual Foundations',
          instruction: 'Attempt ALL 10 questions. Each question carries 1 Mark.',
          totalQuestions: 10,
          attemptCount: 10,
          marksPerQuestion: 1,
          totalMarks: 10,
          questions: [
            {
              id: 'dbms-s3-q1',
              qNum: 1,
              section: 'A',
              marks: 1,
              topic: 'Buffer Pool Role',
              question: 'What is the role of the Buffer Pool Manager in a database management system?',
              markingBreakdown: ['Caching disk pages in RAM: 1 Mark'],
              modelSolution: 'The Buffer Pool Manager caches database disk pages in RAM frames using page replacement policies (like LRU) to minimize expensive disk I/O operations.',
              notebookCheckpoints: ['Caches disk pages in RAM']
            },
            {
              id: 'dbms-s3-q2',
              qNum: 2,
              section: 'A',
              marks: 1,
              topic: 'Relational Projection',
              question: 'Why does Projection (π) in theoretical relational algebra eliminate duplicate rows while SQL SELECT does not?',
              markingBreakdown: ['Set semantics vs multiset/bag semantics: 1 Mark'],
              modelSolution: 'Relational algebra operates on mathematical sets (no duplicates allowed), while SQL operates on bags/multisets to avoid the computational cost of automatic sorting.',
              notebookCheckpoints: ['Sets vs Multisets']
            },
            {
              id: 'dbms-s3-q3',
              qNum: 3,
              section: 'A',
              marks: 1,
              topic: 'Total vs Partial Participation',
              question: 'How is Total Participation visually represented in an Entity-Relationship diagram?',
              markingBreakdown: ['Double line representation: 1 Mark'],
              modelSolution: 'Total participation is represented by a double line connecting the entity rectangle to the relationship diamond.',
              notebookCheckpoints: ['Double line symbol']
            },
            {
              id: 'dbms-s3-q4',
              qNum: 4,
              section: 'A',
              marks: 1,
              topic: 'Integrity CHECK Constraint',
              question: 'Write a SQL CHECK constraint ensuring an `age` column is between 18 and 65.',
              markingBreakdown: ['CHECK syntax: 1 Mark'],
              modelSolution: '`CHECK (age >= 18 AND age <= 65)` or `CHECK (age BETWEEN 18 AND 65)`',
              notebookCheckpoints: ['CHECK (age BETWEEN 18 AND 65)']
            },
            {
              id: 'dbms-s3-q5',
              qNum: 5,
              section: 'A',
              marks: 1,
              topic: 'Correlated Subquery Execution',
              question: 'How many times does a correlated subquery execute relative to the outer query?',
              markingBreakdown: ['Once per candidate outer row: 1 Mark'],
              modelSolution: 'A correlated subquery executes once for every single candidate row evaluated by the outer query.',
              notebookCheckpoints: ['Once per outer row']
            },
            {
              id: 'dbms-s3-q6',
              qNum: 6,
              section: 'A',
              marks: 1,
              topic: 'Transitive Dependency',
              question: 'Define a Transitive Dependency in the context of relational normalization.',
              markingBreakdown: ['X -> Y and Y -> Z where Y not super key: 1 Mark'],
              modelSolution: 'A transitive dependency occurs when non-prime attribute Z depends on attribute Y, which in turn depends on candidate key X, where Y is not a candidate key.',
              notebookCheckpoints: ['Indirect functional dependency']
            },
            {
              id: 'dbms-s3-q7',
              qNum: 7,
              section: 'A',
              marks: 1,
              topic: 'Cascading Rollback',
              question: 'What causes a Cascading Rollback in concurrent transaction schedules?',
              markingBreakdown: ['Reading uncommitted data of aborted transaction: 1 Mark'],
              modelSolution: 'When transaction T1 aborts, and other concurrent transactions that read uncommitted data written by T1 must also be recursively rolled back.',
              notebookCheckpoints: ['Recursive rollback of dependent reads']
            },
            {
              id: 'dbms-s3-q8',
              qNum: 8,
              section: 'A',
              marks: 1,
              topic: 'Shared vs Exclusive Locks',
              question: 'Can two concurrent transactions hold Shared locks on the same data item simultaneously?',
              markingBreakdown: ['Yes, compatibility: 1 Mark'],
              modelSolution: 'Yes. Shared (S) locks are compatible with other Shared locks, allowing concurrent reads.',
              notebookCheckpoints: ['Shared locks are compatible']
            },
            {
              id: 'dbms-s3-q9',
              qNum: 9,
              section: 'A',
              marks: 1,
              topic: 'B+ Tree Fan-out',
              question: 'What does "Fan-out" mean in tree indexing structures?',
              markingBreakdown: ['Number of pointers/children per node: 1 Mark'],
              modelSolution: 'Fan-out refers to the maximum number of child pointers that can be stored within a single index tree node.',
              notebookCheckpoints: ['Max child pointers per node']
            },
            {
              id: 'dbms-s3-q10',
              qNum: 10,
              section: 'A',
              marks: 1,
              topic: 'Full Table Scan',
              question: 'What is a Full Table Scan (Sequential Scan)?',
              markingBreakdown: ['Scanning all pages: 1 Mark'],
              modelSolution: 'A full table scan is an access path where the storage engine reads every single page allocated to a table from beginning to end to evaluate a query.',
              notebookCheckpoints: ['Sequential read of all pages']
            }
          ]
        },
        sectionB: {
          title: 'Section B: Analytical Problems & Query Engineering',
          instruction: 'Attempt ANY 4 questions. Each question carries 5 Marks.',
          totalQuestions: 7,
          attemptCount: 4,
          marksPerQuestion: 5,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s3-q11',
              qNum: 11,
              section: 'B',
              marks: 5,
              topic: 'Query Optimization Plans',
              question: 'Explain the role of the Cost-Based Query Optimizer. What statistics stored in the catalog does it use to pick an optimal plan?',
              markingBreakdown: ['Optimizer role: 2 Marks', 'Catalog statistics (cardinality, histograms): 3 Marks'],
              modelSolution: 'The Cost-Based Optimizer estimates the execution cost (disk I/O and CPU time) of various candidate physical plans. It consults catalog statistics including table cardinality, page count, index depth, distinct key counts, and data distribution histograms to choose between sequential scan, index scan, hash join, or merge join.',
              notebookCheckpoints: ['Estimates disk I/O and CPU', 'Uses histograms and cardinality']
            },
            {
              id: 'dbms-s3-q12',
              qNum: 12,
              section: 'B',
              marks: 5,
              topic: 'Relational Division',
              question: 'Explain the Relational Division operator (R ÷ S) with a practical database example (e.g. students who took ALL required courses).',
              markingBreakdown: ['Division definition: 2 Marks', 'Example with SQL equivalent: 3 Marks'],
              modelSolution: 'Relational division R ÷ S returns tuples in R that are associated with EVERY tuple in S.\nExample: Table R(StudentID, CourseID) and Table S(CourseID) representing required core courses.\nR ÷ S yields students enrolled in ALL core courses in S.\nSQL equivalent uses `GROUP BY StudentID HAVING COUNT(DISTINCT CourseID) = (SELECT COUNT(*) FROM S)`.',
              notebookCheckpoints: ['Matches all rows in S', 'GROUP BY HAVING COUNT(*)']
            },
            {
              id: 'dbms-s3-q13',
              qNum: 13,
              section: 'B',
              marks: 5,
              topic: 'Lock Compatibility Matrix',
              question: 'Construct the Lock Compatibility Matrix for Shared (S) and Exclusive (X) locks. Explain why lock conversion is used.',
              markingBreakdown: ['Matrix table: 3 Marks', 'Lock upgrade/downgrade explanation: 2 Marks'],
              modelSolution: '| Requested Lock | Current Lock S | Current Lock X |\n|---|---|---|\n| Shared (S) | Compatible (Grant) | Conflict (Wait) |\n| Exclusive (X) | Conflict (Wait) | Conflict (Wait) |\n\nLock Conversion: Transactions can request a Shared lock initially for reading, and later upgrade it to an Exclusive lock only if an update is required, reducing initial lock contention.',
              notebookCheckpoints: ['S-S compatible, X conflicts with all', 'Lock upgrades']
            },
            {
              id: 'dbms-s3-q14',
              qNum: 14,
              section: 'B',
              marks: 5,
              topic: 'Lossless Join Proof',
              question: 'Given relation R(A, B, C) with FD: A -> B. Relation R is decomposed into R1(A, B) and R2(A, C). Prove whether the decomposition is Lossless.',
              markingBreakdown: ['Intersection check: 2 Marks', 'Super key closure proof: 3 Marks'],
              modelSolution: 'Step 1: Compute intersection of decomposed relations: R1 ∩ R2 = {A, B} ∩ {A, C} = {A}.\nStep 2: Check if {A} is a super key for either R1 or R2.\nGiven FD is A -> B. The closure of {A} in R1 is (A)+ = {A, B}, which covers all attributes of R1.\nStep 3: Since (R1 ∩ R2) -> R1, the decomposition strictly satisfies the Lossless Join decomposition theorem.',
              notebookCheckpoints: ['R1 ∩ R2 = {A}', '(A)+ = {A,B} covers R1 -> Lossless']
            },
            {
              id: 'dbms-s3-q15',
              qNum: 15,
              section: 'B',
              marks: 5,
              topic: 'Phantom Read Prevention',
              question: 'What causes Phantom Reads and how does MySQL InnoDB prevent them using Next-Key Locks?',
              markingBreakdown: ['Phantom read range query explanation: 2 Marks', 'Next-Key locking mechanism: 3 Marks'],
              modelSolution: 'Phantom read occurs when a transaction queries a range of rows (e.g. `WHERE salary > 50k`), and another transaction inserts a new row matching that range and commits.\nNext-Key Locks: InnoDB combines an index-record lock with a gap lock (locking the gaps between index records), blocking concurrent transactions from inserting new rows into the scanned index interval.',
              notebookCheckpoints: ['Range query anomaly', 'Record lock + Gap lock']
            },
            {
              id: 'dbms-s3-q16',
              qNum: 16,
              section: 'B',
              marks: 5,
              topic: 'SQL Set Operations Compatibility',
              question: 'What are the two mandatory conditions for two SQL queries to be Union-Compatible?',
              markingBreakdown: ['Same column count: 2.5 Marks', 'Compatible data types: 2.5 Marks'],
              modelSolution: '1. Both SELECT queries must project the exact same number of columns in their output lists.\n2. The corresponding columns across both queries must share compatible or castable data types in matching positional order.',
              notebookCheckpoints: ['Same column count', 'Compatible data types']
            },
            {
              id: 'dbms-s3-q17',
              qNum: 17,
              section: 'B',
              marks: 5,
              topic: 'Composite Index Leftmost Rule',
              question: 'Given an index on `(department_id, hire_date, salary)`: Which of the following queries can utilize the index? (a) `WHERE department_id = 5`, (b) `WHERE hire_date = \'2026-01-01\'`, (c) `WHERE department_id = 5 AND hire_date = \'2026-01-01\'`.',
              markingBreakdown: ['Evaluation of query (a): 1.5 Marks', 'Evaluation of query (b): 2 Marks', 'Evaluation of query (c): 1.5 Marks'],
              modelSolution: '- Query (a): CAN use index seek because it starts with the leftmost column (department_id).\n- Query (b): CANNOT use index seek because it skips the leftmost prefix (department_id is missing); requires full table scan.\n- Query (c): CAN use index seek fully because it provides matching values for both leftmost columns (department_id and hire_date).',
              notebookCheckpoints: ['(a) and (c) use index', '(b) skips leftmost column']
            }
          ]
        },
        sectionC: {
          title: 'Section C: Comprehensive Architecture & Normalization',
          instruction: 'Attempt ANY 2 questions. Each question carries 10 Marks.',
          totalQuestions: 3,
          attemptCount: 2,
          marksPerQuestion: 10,
          totalMarks: 20,
          questions: [
            {
              id: 'dbms-s3-q18',
              qNum: 18,
              section: 'C',
              marks: 10,
              topic: 'Concurrency Control Protocols Comparison',
              question: 'Compare Lock-Based Protocols (Strict 2PL), Timestamp-Based Ordering Protocols, and Multi-Version Concurrency Control (MVCC). Explain how MVCC achieves high read throughput without blocking writers.',
              markingBreakdown: [
                'Comparison of 2PL, Timestamp, and MVCC: 4 Marks',
                'MVCC snapshot isolation mechanism: 4 Marks',
                'Read/Write non-blocking benefit: 2 Marks'
              ],
              modelSolution: '1. Protocol Comparison:\n- Lock-Based (Strict 2PL): Acquires S and X locks; writers block readers and readers block writers. Prevents cascading rollbacks but limits read concurrency.\n- Timestamp Ordering: Orders transactions strictly by arrival timestamp (TS); aborts operations violating temporal serial order.\n- Multi-Version Concurrency Control (MVCC): Maintains multiple physical versions of each tuple tagged with creation and deletion transaction IDs.\n\n2. MVCC Mechanics:\n- When a row is updated, the DBMS does not overwrite the old row in-place; it marks the old row with a delete timestamp and inserts a new version.\n- Read transactions read the snapshot corresponding to their start timestamp without acquiring locks.\n- Therefore: Readers never block Writers, and Writers never block Readers, resulting in massive concurrent read throughput in modern systems like PostgreSQL and MySQL InnoDB.',
              notebookCheckpoints: ['Locks vs Timestamps vs MVCC', 'Readers never block writers', 'Snapshot isolation']
            },
            {
              id: 'dbms-s3-q19',
              qNum: 19,
              section: 'C',
              marks: 10,
              topic: 'Comprehensive 3NF & BCNF Normalization',
              question: 'Given relation R(A, B, C, D, E, F) with F = { AB -> C, C -> D, D -> E, E -> F, F -> B }.\n(a) Find all Candidate Keys.\n(b) Determine the highest normal form of relation R.\n(c) Decompose into 3NF and verify dependency preservation.',
              markingBreakdown: [
                'Candidate keys derivation: 3 Marks',
                'Highest normal form determination: 3 Marks',
                '3NF decomposition and dependency check: 4 Marks'
              ],
              modelSolution: '(a) Candidate Keys:\nNotice A is not on RHS of any FD, so A must be in all candidate keys.\n- (AB)+ = {A, B, C, D, E, F} -> AB is a Candidate Key.\n- Since F -> B: (AF)+ = {A, F, B, C, D, E} -> AF is a Candidate Key.\n- Since E -> F: (AE)+ = {A, E, F, B, C, D} -> AE is a Candidate Key.\n- Since D -> E: (AD)+ = {A, D, E, F, B, C} -> AD is a Candidate Key.\n- Since C -> D: (AC)+ = {A, C, D, E, F, B} -> AC is a Candidate Key.\nCandidate Keys are {AB, AC, AD, AE, AF}.\n\n(b) Normal Form:\nPrime attributes: {A, B, C, D, E, F} (All attributes are prime!).\nBecause all attributes are prime, no non-prime attribute exists. Hence partial and transitive dependencies on non-prime attributes are impossible!\nTherefore, Relation R is in 3NF.\nHowever, in C -> D, determinant C is not a Super Key. So R violates BCNF.\nHighest Normal Form: 3NF.\n\n(c) 3NF Synthesis:\nSince R is already in 3NF, no decomposition is required to achieve 3NF, perfectly preserving all functional dependencies.',
              notebookCheckpoints: ['All attributes are prime', 'Relation is in 3NF', 'Violates BCNF']
            },
            {
              id: 'dbms-s3-q20',
              qNum: 20,
              section: 'C',
              marks: 10,
              topic: 'Physical Database Storage Engine Internals',
              question: 'Explain how relational data is structured on disk: (a) Slotted-Page Architecture, (b) Record layout formats (Fixed vs Variable length), and (c) Write-Ahead Log (WAL) record format.',
              markingBreakdown: [
                'Slotted-Page architecture with diagram description: 4 Marks',
                'Fixed vs Variable-length record layout: 3 Marks',
                'WAL log sequence number (LSN) and structure: 3 Marks'
              ],
              modelSolution: '1. Slotted-Page Architecture:\n- A standard disk block (e.g. 8KB or 16KB) is organized with a Page Header at the beginning and raw tuple data at the end, growing toward each other.\n- Header contains page metadata, free-space pointer, and a slot directory array.\n- Each slot holds an offset pointer and length for a specific tuple.\n- Allows records to be moved or reorganized within the page without changing their external Tuple ID (PageID + SlotNumber).\n\n2. Record Layout Formats:\n- Fixed-length: Predefined byte widths stored sequentially; direct O(1) arithmetic offset computation.\n- Variable-length: Null bitmap followed by fixed attributes and an offset table directing to variable-length strings (VARCHAR/TEXT) stored at the tail of the record.\n\n3. Write-Ahead Log (WAL) Record:\n- Each log record contains a unique monotonically increasing Log Sequence Number (LSN), Transaction ID, PrevLSN (linking records of the same txn), Type (Insert/Update/Commit), Page ID, and Redo/Undo delta payloads.',
              notebookCheckpoints: ['Slotted-page header and slot directory', 'Tuple ID = PageID + Slot', 'LSN and WAL payloads']
            }
          ]
        }
      }
    }
  }
};
